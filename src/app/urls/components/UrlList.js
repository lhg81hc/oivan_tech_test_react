import { showModal } from "@/state-management/slices/modalSlice";

function UrlList({ currentData, isFetching, isError, dispatch, removeUrl }) {
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
        {currentData.map(url => (
            <tr key={url.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <a
                  href={url.original}
                  className="ext-blue-600 dark:text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  {url.original}
                </a>
              </td>

              <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-left text-sm text-gray-500 font-medium">
                <a
                  href={url.reference_url}
                  className="ext-blue-600 dark:text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  {url.reference_url}
                </a>

                <svg
                  className="text-gray-500 hover:text-blue-500 cursor-pointer w-4 h-4 inline-block ml-3"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  onClick={() => {navigator.clipboard.writeText(url.reference_url)}}
                >
                  <title>Copy reference</title>
                  <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/>
                </svg>
              </td>
              <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-left text-sm text-gray-500">
                {url.state}
              </td>
              <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-left text-sm text-gray-500">
                {url.updated_at}
              </td>

              <td className="py-3.5 pl-6 pr-3 text-left text-sm text-gray-500">
                <svg
                  className="text-gray-500 hover:text-blue-500 cursor-pointer w-4 h-4 inline-block ml-2"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                  onClick={() => dispatch(showModal({ modalType: 'CREATE_EDIT_URL', modalProps: { url } }))}
                >
                  <title>Edit</title>
                  <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
                </svg>

                <svg
                  className="text-gray-500 hover:text-red-500 cursor-pointer w-4 h-4 inline-block ml-2"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  onClick={() => removeUrl(url)}
                >
                  <title>Remove</title>
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
              </td>
            </tr>
          ))
        }
      </tbody>
    )
  }

  return (
    <div className="mt-10 flex flex-col">
      {/*<div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-auto">*/}
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
                    Original
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Shortened
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Last update
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
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

export default UrlList;
