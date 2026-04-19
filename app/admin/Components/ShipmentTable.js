'use client';
import ErrorBox from '@/app/dashboard/Components/ErrorBox';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import UpdateShipmentMenu from './UpdateShipmentMenu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteShipment } from '@/app/api/supabaseapi';
import MessageLog from './MessageLog';
import { MdEditDocument } from 'react-icons/md';
import EditStatusForm from './EditStatusForm';
function ShipmentTable({
  error,
  data,
  users,
  transittimes,
  transitError,
  allPackageType,
  packageError,
  statuses,
  statusError,
  shippingError,
  shippingtype,
}) {
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [editStatusOpen, setStatusMenuOpen] = useState(false);
  const [activeShipment, setActiveShipment] = useState('null');
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDeleteConfirm() {
    setDeleting(true);
    const error = await deleteShipment(confirmDeleteId);
    setDeleting(false);
    setConfirmDeleteId(null);
    if (error) {
      setErrMessage('This Shipment Failed to Delete, Try Again');
    } else {
      setSuccessMessage('Shipment has been deleted successfully');
      router.refresh();
    }
  }

  function handleEditShipment(shipment) {
    setEditMenuOpen(true);
    setActiveShipment(shipment);
  }

  function handleEditStatus(shipment) {
    setStatusMenuOpen(true);
    setActiveShipment(shipment);
  }

  return (
    <>
      {errMessage ? (
        <MessageLog
          message={errMessage}
          setMessage={setErrMessage}
          value={false}
        />
      ) : (
        <MessageLog
          message={successMessage}
          setMessage={setSuccessMessage}
          value={true}
        />
      )}
      {editMenuOpen ? (
        <UpdateShipmentMenu
          editMenuOpen={editMenuOpen}
          setEditMenuOpen={setEditMenuOpen}
          activeShipment={activeShipment}
          data={data}
          users={users}
          transittimes={transittimes}
          transitError={transitError}
          allPackageType={allPackageType}
          packageError={packageError}
          statuses={statuses}
          statusError={statusError}
          shippingtype={shippingtype}
          shippingError={shippingError}
        />
      ) : (
        ''
      )}
      {editStatusOpen ? (
        <EditStatusForm
          editStatusOpen={editStatusOpen}
          setStatusMenuOpen={setStatusMenuOpen}
          activeShipment={activeShipment}
          data={data}
          users={users}
          transittimes={transittimes}
          transitError={transitError}
          allPackageType={allPackageType}
          packageError={packageError}
          statuses={statuses}
          statusError={statusError}
          shippingtype={shippingtype}
          shippingError={shippingError}
        />
      ) : (
        ''
      )}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <MdDelete size={28} className="text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Shipment?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone. The shipment record will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full whitespace-nowrap text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Tracking Number</th>
              <th className="px-6 py-4">Shipper</th>
              <th className="px-6 py-4">Receiver</th>
              <th className="px-6 py-4">Package Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {error ? (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <div className="flex justify-center">
                    <ErrorBox message={error.message} />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((shipment) => (
                <tr key={shipment.trackingnumber} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {shipment.trackingnumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {shipment.shipper_detail?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {shipment.receiver_detail?.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {shipment.package_type.type}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${shipment.status_id.status?.toLowerCase() === 'completed' || shipment.status_id.status?.toLowerCase() === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : shipment.status_id.status?.toLowerCase() === 'canceled' || shipment.status_id.status?.toLowerCase() === 'cancelled'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                      {shipment.status_id.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => handleEditShipment(shipment)}
                        className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit Shipment Details"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleEditStatus(shipment)}
                        className="p-1.5 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                        title="Update Status"
                      >
                        <MdEditDocument size={16} />
                      </button>
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <button
                        onClick={() => setConfirmDeleteId(shipment.shipment_id)}
                        className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Shipment"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShipmentTable;
