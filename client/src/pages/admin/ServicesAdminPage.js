// src/pages/ServicesAdminPage.js
import React, { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  // or addDoc, deleteDoc if you want to create/delete
} from 'firebase/firestore';
import { db } from '../../firebase'; // Update to your firebase config path

function ServicesAdminPage() {
  // State for "services" section
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // State for "Why Choose Us" section
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const [whyChooseUsLoading, setWhyChooseUsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchServices();
    fetchWhyChooseUs();
  }, []);

  // Fetch services from Firestore
  const fetchServices = async () => {
    setServicesLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = [];
      querySnapshot.forEach((docSnap) => {
        servicesData.push({ id: docSnap.id, ...docSnap.data() });
      });
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
    setServicesLoading(false);
  };

  // Fetch whyChooseUs data from Firestore
  const fetchWhyChooseUs = async () => {
    setWhyChooseUsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'whyChooseUs'));
      const whyData = [];
      querySnapshot.forEach((docSnap) => {
        whyData.push({ id: docSnap.id, ...docSnap.data() });
      });
      setWhyChooseUs(whyData);
    } catch (error) {
      console.error('Error fetching whyChooseUs:', error);
    }
    setWhyChooseUsLoading(false);
  };

  // Handler for updating a single service doc
  const handleServiceChange = (serviceId, field, value) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    );
  };

  // Handler for updating an array of features
  const handleFeaturesChange = (serviceId, newFeatures) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, features: newFeatures } : service
      )
    );
  };

  // Handler for saving a single service doc back to Firestore
  const saveService = async (serviceId) => {
    const serviceToSave = services.find((s) => s.id === serviceId);
    if (!serviceToSave) return;

    try {
      const docRef = doc(db, 'services', serviceId);
      await updateDoc(docRef, {
        title: serviceToSave.title,
        description: serviceToSave.description,
        features: serviceToSave.features,
        iconName: serviceToSave.iconName || '',
      });
      alert('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  // Handler for updating WhyChooseUs doc
  const handleWhyChange = (whyId, field, value) => {
    setWhyChooseUs((prev) =>
      prev.map((item) =>
        item.id === whyId ? { ...item, [field]: value } : item
      )
    );
  };

  // Handler for saving a single whyChooseUs doc
  const saveWhy = async (whyId) => {
    const itemToSave = whyChooseUs.find((w) => w.id === whyId);
    if (!itemToSave) return;

    try {
      const docRef = doc(db, 'whyChooseUs', whyId);
      await updateDoc(docRef, {
        title: itemToSave.title,
        description: itemToSave.description,
        iconName: itemToSave.iconName || '',
      });
      alert('Why Choose Us item updated successfully!');
    } catch (error) {
      console.error('Error updating whyChooseUs item:', error);
    }
  };

  // Render
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin: Services Page Content</h1>

      {/* SERVICES SECTION */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Services</h2>
        {servicesLoading ? (
          <p>Loading services...</p>
        ) : (
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.id} className="p-4 border rounded bg-white mb-4">
                <label className="block mb-2">
                  Title:
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </label>

                <label className="block mb-2">
                  Description:
                  <textarea
                    rows="3"
                    value={service.description}
                    onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </label>

                <label className="block mb-2">
                  Features (comma-separated):
                  <input
                    type="text"
                    value={service.features ? service.features.join(', ') : ''}
                    onChange={(e) => {
                      const featuresArray = e.target.value.split(',').map((f) => f.trim());
                      handleFeaturesChange(service.id, featuresArray);
                    }}
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </label>

                <label className="block mb-2">
                  Icon Name (optional):
                  <input
                    type="text"
                    value={service.iconName || ''}
                    onChange={(e) => handleServiceChange(service.id, 'iconName', e.target.value)}
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </label>

                <button
                  onClick={() => saveService(service.id)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr className="my-8" />

      {/* WHY CHOOSE US SECTION */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
        {whyChooseUsLoading ? (
          <p>Loading Why Choose Us...</p>
        ) : (
          <div className="space-y-6">
            {whyChooseUs.map((item) => (
              <div key={item.id} className="p-4 border rounded bg-white mb-4">
                <label className="block mb-2">
                  Title:
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleWhyChange(item.id, 'title', e.target.value)}
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </label>

                <label className="block mb-2">
                  Description:
                  <textarea
                    rows="2"
                    value={item.description}
                    onChange={(e) => handleWhyChange(item.id, 'description', e.target.value)}
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </label>

                <label className="block mb-2">
                  Icon Name (optional):
                  <input
                    type="text"
                    value={item.iconName || ''}
                    onChange={(e) => handleWhyChange(item.id, 'iconName', e.target.value)}
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </label>

                <button
                  onClick={() => saveWhy(item.id)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ServicesAdminPage;
