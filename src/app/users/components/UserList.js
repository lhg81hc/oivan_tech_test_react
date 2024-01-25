import { showModal } from "@/state_management/slices/modalSlice";

function UserList({ currentData, isFetching, isError, dispatch, removeUser }) {

  if (isFetching && !currentData) {
    return (
      <div className="mt-10 flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tableBody = () => {
    if (isError) {
      return (
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td colSpan="5" className="py-3.5 pl-6 pr-3 text-center text-lg text-red-500">An error has occurred!</td>
          </tr>
        </tbody>
      )
    }

    if (currentData?.length === 0) {
      return (
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td colSpan="5" className="py-3.5 pl-6 pr-3 text-center text-lg dark:text-gray-500">No data available</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="divide-y divide-gray-200 bg-white">
        {currentData.map(user => (
            <tr key={user.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <a
                  href={`mailto:${user.email}`}
                  className="ext-blue-600 dark:text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  {user.email}
                </a>
              </td>

              <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-left text-sm text-gray-500">
                {user.name}
              </td>
              <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-left text-sm text-gray-500">
                {user.role}
              </td>
              <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-left text-sm text-gray-500">
                {user.state}
              </td>

            </tr>
          ))
        }
      </tbody>
    )
  }

  return (
    <div className="mt-10 flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className={`min-w-full divide-y divide-gray-300 ${isFetching ? "opacity-7" : null}`}>
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    State
                  </th>
                </tr>
              </thead>
              {tableBody()}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const Skeleton = () => {
  return (
    <table className={`min-w-full divide-y divide-gray-300`}>
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 animate-pulse"
          >
            <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 animate-pulse">
            <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default UserList;
