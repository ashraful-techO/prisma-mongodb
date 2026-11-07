# Search, Filter, Sort, and Pagination

This note documents the plan and the implementation details for adding search,
filtering, sorting, and pagination to the existing User Management CRUD app.

## Goal

Keep the current create / edit / delete features, but make the user list
dynamic:

- Search by name or email
- Filter by minimum and maximum age
- Sort by name, age, or created date
- Paginate with a selectable page size

## API contract

`GET /api/users` now accepts these query parameters:

| Parameter   | Values                          | Default      |
| ----------- | ------------------------------- | ------------ |
| `search`    | any text                        | empty        |
| `minAge`    | integer >= 0                    | not applied  |
| `maxAge`    | integer >= 0                    | not applied  |
| `page`      | integer >= 1                    | `1`          |
| `limit`     | `10`, `20`, `50`                | `10`         |
| `sortBy`    | `name`, `age`, `createdAt`      | `createdAt`  |
| `sortOrder` | `asc`, `desc`                   | `desc`       |

Response shape:

```json
{
  "users": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalRecords": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

## Implementation steps

1. **Shared types** — `src/types/user.ts`
   - `User`
   - `UserQueryParams`
   - `PaginatedUsersResponse`
   - `PaginationMeta`

2. **Backend** — `src/app/api/users/route.ts`
   - Read query values with `new URL(req.url).searchParams`.
   - Sanitize numbers, page size, sort field, and sort order.
   - Build a Prisma `where` object:
     - `OR` on `name` / `email` for search (case-insensitive).
     - `age.gte` / `age.lte` for the age filters.
   - Use `skip` and `take` for pagination.
   - Use `orderBy` for sorting.
   - Fetch users and count total matches together with `Promise.all`.
   - Return users plus pagination metadata.
   - Keep the existing `POST` handler unchanged.

3. **Frontend** — `src/component/User.tsx`
   - Keep the existing create/update form and delete action.
   - Add search input with a 500 ms debounce and a clear button.
   - Add min/max age inputs with Apply and Reset buttons.
   - Add sort field and sort order selects.
   - Add a page size selector, previous/next buttons, and record counts.
   - Show loading, empty, and error states in the table area.
   - Reset the page to 1 whenever the search or filters change.
   - Sync the query state to the browser URL with `URLSearchParams` and
     `history.replaceState`, and read it back on first load.

4. **Page width** — `src/app/page.tsx`
   - Widen the container so the responsive table has enough room.

## Why this structure

- The backend and frontend logic stay in separate files.
- The Prisma query is built dynamically, so search and filters combine without
  duplicated query branches.
- `Promise.all` avoids waiting for the list and the count one after another.
- The URL stays shareable/bookmarkable because the list state is reflected in
  the query string.
- TanStack Query handles loading/error/caching, so the list no longer needs a
  manual `fetch` inside `useEffect`.
- Mutations invalidate the `["users"]` cache, so the table refreshes
  automatically after create/update/delete.

## Learning-friendly file map

The original implementation put too much into one component. It is now split
into small pieces so each file has one job.

### Backend

- `src/lib/user-options.ts` — defaults, page sizes, and small parse helpers.
- `src/lib/user-query.ts` — turns query params into a Prisma `where`,
  `orderBy`, and pagination object.
- `src/app/api/users/route.ts` — the `GET` handler now only connects those
  helpers to `prisma.findMany` and `prisma.count`.

### Frontend data (TanStack Query)

- `src/app/providers.tsx` — creates the shared `QueryClient` and wraps the app.
- `src/component/user/userApi.ts` — all `fetch` calls for list/create/update/delete.
- `src/component/user/useUserList.ts` — owns search/filter/sort/page state and
  uses `useQuery` to load the list.
- `src/component/user/useUserMutations.ts` — uses `useMutation` for
  create/update/delete and invalidates the `["users"]` cache on success.
- `src/component/user/userQueryUrl.ts` — reads/writes query state from the URL.

### Frontend UI

- `src/component/user/UserForm.tsx` — create/update form.
- `src/component/user/SearchBar.tsx` — search input and clear button.
- `src/component/user/SortControls.tsx` — sort field, sort order, page size.
- `src/component/user/AgeFilters.tsx` — min/max age inputs and buttons.
- `src/component/user/UserTable.tsx` — table plus loading/empty/error states.
- `src/component/user/Pagination.tsx` — previous/next and record counts.
- `src/component/User.tsx` — only connects the pieces together.

Each small component receives plain values and callbacks as props. The data
hook is the only place that talks to the API.
