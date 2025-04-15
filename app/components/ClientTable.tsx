import { Client, ClientStatus } from "../utils/Types";

interface ClientTableProps {
    clients: Client[];
  }
  
  const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
    const formatDate = (dateString: string) => {
      try {
          return new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          }).format(new Date(dateString));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: unknown) {
          return 'Invalid Date';
      }
    };
  
    const getStatusBadgeClass = (status: ClientStatus) => {
      switch (status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Inactive': return 'bg-red-100 text-red-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.clientType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(client.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(client.updatedAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(client.status)}`}>
                    {client.status}
                  </span>
                </td>
              </tr>
            ))}
             {clients.length === 0 && (
               <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">
                      No clients match the current criteria.
                  </td>
              </tr>
             )}
          </tbody>
        </table>
      </div>
    );
  };

  export default ClientTable