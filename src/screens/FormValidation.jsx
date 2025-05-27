import React, { useRef, useState } from "react";
import NumberInputWithCheck from "../components/NumberInputWithCheck ";
import SelectInputWithCheck from "../components/SelectInputWithCheck";
import TextInputWithCheck from "../components/TextInputWithCheck";
import PhotoUploader from "../components/PhotoUploader";
import AlertBox from "../components/AlertBox";

const FormValidation = () => {
  const [formData, setFormData] = useState({
    type: "",
    superBuiltupArea: "",
    carpetArea: "",
    description: "",
    adTitle: "",
    price: "",
    phone: "",
    state: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    projectStatus: "",
    listedBy: "",
    carParking: "",
    totalFloors: "",
    maintenance: "",
    floorNo: "",
    facing: "",
    projectName: "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const inputRef = useRef();
  const isValidPhone = (phone) => /^\d{10}$/.test(phone.trim());
  const isValidText = (text) => text.trim().length >= 10;
  const isNonEmpty = (value) => value.trim() !== "";
  const [showAlert, setShowAlert] = useState(false);

  const isFormValid =
    formData.type.trim() !== "" &&
    formData.superBuiltupArea.trim() !== "" &&
    formData.carpetArea.trim() !== "" &&
    formData.adTitle.trim().length >= 10 &&
    formData.description.trim().length >= 10 &&
    formData.price.trim() !== "" &&
    /^\d{10}$/.test(formData.phone.trim()) &&
    formData.state.trim() !== "" &&
    photos.length > 0;

  const handleChange = (field, value) => {
    if (
      (field === "superBuiltupArea" ||
        field === "carpetArea" ||
        field === "price" ||
        field === "phone") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }
    setFormData({ ...formData, [field]: value });
    if (field === "adTitle") {
      setErrors((prev) => ({
        ...prev,
        adTitle: !isValidText(value),
      }));
    } else if (field === "description") {
      setErrors((prev) => ({
        ...prev,
        description: !isValidText(value),
      }));
    } else if (field === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: !isValidPhone(value),
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: !isNonEmpty(value),
      }));
    }
  };

  const handleBlur = (field) => {
    if (field === "projectName") return;
    if (field === "adTitle") {
      setErrors((prev) => ({
        ...prev,
        adTitle: !isValidText(formData.adTitle),
      }));
    } else if (field === "description") {
      setErrors((prev) => ({
        ...prev,
        description: !isValidText(formData.description),
      }));
    } else if (field === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: !isValidPhone(formData.phone),
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: !isNonEmpty(formData[field]),
      }));
    }
  };

  const handleTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
    setErrors((prev) => ({ ...prev, type: !isNonEmpty(value) }));
  };

  const handleStateChange = (value) => {
    setFormData((prev) => ({ ...prev, state: value }));
    setErrors((prev) => ({ ...prev, state: !isNonEmpty(value) }));
  };

  const typeOptions = [
    "Flats / Apartments",
    "Independent / Builder Floors",
    "Farm House",
    "House & Villa",
  ];
  const bhkOptions = ["1", "2", "3", "4", "4+"];
  const bathroomOptions = ["1", "2", "3", "4", "4+"];
  const furnishingOptions = ["Furnished", "Semi-Furnished", "Unfurnished"];
  const projectStatusOptions = [
    "New Launch",
    "Ready to Move",
    "Under Construction",
  ];
  const listedByOptions = ["Builder", "Dealer", "Owner"];
  const carParkingOptions = ["0", "1", "2", "3", "3+"];

  const handleBHKSelect = (selectedBHK) => {
    setFormData((prev) => ({ ...prev, bhk: selectedBHK }));
    if (errors.bhk) {
      setErrors((prev) => ({ ...prev, bhk: null }));
    }
  };

  const handleBathroomSelect = (selected) => {
    setFormData((prev) => ({ ...prev, bathrooms: selected }));
    if (errors.bathrooms) {
      setErrors((prev) => ({ ...prev, bathrooms: null }));
    }
  };

  const handleFurnishingSelect = (selectedFurnishing) => {
    setFormData((prev) => ({ ...prev, furnishing: selectedFurnishing }));
    if (errors.furnishing) {
      setErrors((prev) => ({ ...prev, furnishing: null }));
    }
  };

  const handleProjectStatusSelect = (selectedStatus) => {
    setFormData((prev) => ({ ...prev, projectStatus: selectedStatus }));
    if (errors.projectStatus) {
      setErrors((prev) => ({ ...prev, projectStatus: null }));
    }
  };

  const handleListedBySelect = (selected) => {
    setFormData((prev) => ({ ...prev, listedBy: selected }));
    if (errors.listedBy) {
      setErrors((prev) => ({ ...prev, listedBy: null }));
    }
  };

  const handleCarParkingSelect = (selected) => {
    setFormData((prev) => ({ ...prev, carParking: selected }));
    if (errors.carParking) {
      setErrors((prev) => ({ ...prev, carParking: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowAlert(true); // Show alert box
      // You can also clear form or send data to backend here
    }
  };

  const resetForm = () => {
    setFormData({
      type: "",
      superBuiltupArea: "",
      carpetArea: "",
      description: "",
      adTitle: "",
      price: "",
      phone: "",
      state: "",
      bhk: "",
      bathrooms: "",
      furnishing: "",
      projectStatus: "",
      listedBy: "",
      carParking: "",
      totalFloors: "",
      maintenance: "",
      floorNo: "",
      facing: "",
      projectName: "",
    });
    setErrors({});
    setImage(null);
    setPhotos([]);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold uppercase mt-[100px]">
        Post your Ad
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mt-10 border border-gray-300 rounded-md shadow-sm bg-white"
      >
        <div className="p-6 space-y-6">
          <h2 className="text-[20px] font-bold mb-4 uppercase">
            Selected category
          </h2>
          <div className="mb-4">
            <div className="text-[#8d9094] text-[14px]">
              <span className="cursor-pointer">Properties</span> {"  "}/{"  "}
              <span className="cursor-pointer">
                For Sale: Houses & Apartments
              </span>
              <a
                href="#"
                className="ms-3 font-bold text-[#004896] border-b-2 border-[#004896] hover:border-transparent pb-1 transition"
              >
                Change
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300">
          <div className="p-6 ms-4">
            <h2 className="text-[20px] font-bold mb-4 uppercase">
              INCLUDE SOME DETAILS
            </h2>
            <div className="mb-8">
              <label className="block font-medium mb-1">Type *</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-4 py-1 border rounded hover:bg-[#d9ebfe] ${
                        formData.type === option
                          ? "bg-[#d9ebfe] border-[black]"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleTypeSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {errors.type && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select a type.
                  </p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <label className="block font-medium mb-1">BHK</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {bhkOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-6 py-1 border rounded hover:bg-[#d9ebfe] ${
                        formData.bhk === option
                          ? "bg-[#d9ebfe] border-[black]"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleBHKSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.bhk && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select BHK.
                  </p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <label className="block font-medium mb-1">Bathrooms</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {bathroomOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-6 py-1 border rounded hover:bg-[#d9ebfe] ${
                        formData.bathrooms === option
                          ? "bg-[#d9ebfe] border-[black]"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleBathroomSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.bathrooms && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select number of bathrooms.
                  </p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <label className="block font-medium mb-1">Furnishing</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {furnishingOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-4 py-1 border rounded transition duration-200 ease-in-out ${
                        formData.furnishing === option
                          ? "bg-[#d9ebfe] border-black"
                          : "border-gray-400 hover:bg-[#f0f0f0]"
                      }`}
                      onClick={() => handleFurnishingSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.furnishing && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select furnishing.
                  </p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <label className="block font-medium mb-1">Project Status</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {projectStatusOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-4 py-1 border rounded transition duration-200 ease-in-out ${
                        formData.projectStatus === option
                          ? "bg-[#d9ebfe] border-black"
                          : "border-gray-400 hover:bg-[#f0f0f0]"
                      }`}
                      onClick={() => handleProjectStatusSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.projectStatus && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select project status.
                  </p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <label className="block font-medium mb-1">Listed by</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {listedByOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-4 py-1 border rounded transition duration-200 ease-in-out ${
                        formData.listedBy === option
                          ? "bg-[#d9ebfe] border-black"
                          : "border-gray-400 hover:bg-[#f0f0f0]"
                      }`}
                      onClick={() => handleListedBySelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.listedBy && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select who listed the property.
                  </p>
                )}
              </div>
            </div>

            <NumberInputWithCheck
              label="Super Builtup area sqft"
              name="superBuiltupArea"
              value={formData.superBuiltupArea}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.superBuiltupArea}
            />
            <NumberInputWithCheck
              label="Carpet Area sqft"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.carpetArea}
            />
            <NumberInputWithCheck
              label="Maintenance (Monthly)"
              name="maintenance"
              value={formData.maintenance}
              onChange={handleChange}
              onBlur={handleBlur}
              required={false}
            />
            <NumberInputWithCheck
              label="Total Floors"
              name="totalFloors"
              value={formData.totalFloors}
              onChange={handleChange}
              onBlur={handleBlur}
              required={false}
            />
            <NumberInputWithCheck
              label="Floor No"
              name="floorNo"
              value={formData.floorNo}
              onChange={handleChange}
              onBlur={handleBlur}
              required={false}
            />
            <div className="mb-8">
              <label className="block font-medium mb-1">Car Parking</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {carParkingOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-6 py-1 border rounded transition duration-200 ease-in-out ${
                        formData.carParking === option
                          ? "bg-[#d9ebfe] border-black"
                          : "border-gray-400 hover:bg-[#f0f0f0]"
                      }`}
                      onClick={() => handleCarParkingSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.carParking && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select car parking.
                  </p>
                )}
              </div>
            </div>
            <SelectInputWithCheck
              label="Facing"
              name="facing"
              value={formData.facing}
              onChange={handleChange}
              required={false}
              options={[
                "East",
                "North",
                "North-East",
                "North-West",
                "South",
                "South-East",
                "South-West",
                "West",
              ]}
            />
            <TextInputWithCheck
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              onBlur={handleBlur}
              required={false}
              minLength={1}
            />

            <TextInputWithCheck
              label="Ad title *"
              name="adTitle"
              value={formData.adTitle}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.adTitle}
              minLength={10}
              hint="Mention the key features of your item (e.g. brand, model, age, type)"
            />
            <TextInputWithCheck
              label="Description *"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description}
              minLength={10}
              hint="Include condition, features and reason for selling"
            />
          </div>
        </div>

        <div className="border-t border-gray-300">
          <div className="p-6 ms-4">
            <h2 className="text-[20px] font-bold mb-4 uppercase">
              SET A PRICE
            </h2>

            <label
              className={`block font-medium mb-1 ${
                errors.price ? "text-red-600" : ""
              }`}
            >
              Price *
            </label>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded focus:outline-none ${
                  errors.price
                    ? "border-red-600"
                    : "border-gray-400 focus:border-gray-400"
                }`}
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">Price is required.</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300">
          <div className="p-6 ms-4">
            <h2 className="text-[20px] font-bold mb-4 uppercase">
              Upload up to 20 photos
            </h2>
            <PhotoUploader photos={photos} onPhotosChange={setPhotos} />
            {photos.length === 0 && (
              <p className="text-red-600 text-sm mt-1">
                This field is mandatory.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300">
          <div className="p-6 ms-4">
            <h2 className="text-[20px] font-bold mb-4 uppercase">
              Confirm your location
            </h2>

            <div className="relative w-full max-w-md">
              <label htmlFor="state" className="block font-medium mb-1">
                State *
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={(e) => handleStateChange(e.target.value)}
                onBlur={() => handleBlur("state")}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
                  errors.state ? "border-red-600" : "border-gray-300"
                } focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
              {errors.state && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300">
          <div className="p-6 ms-4">
            <h2 className="text-[20px] font-bold mb-4 uppercase">
              Review your details
            </h2>
            <div className="relative w-full max-w-md">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div className="relative w-24 h-24 rounded-full border-2 border-gray-500 ">
                    {image ? (
                      <img
                        src={image}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-1 border-gray-500 object-cover"
                      />
                    ) : (
                      ""
                    )}

                    <div
                      className="absolute bottom-0 right-0 bg-slate-900 p-1.5 rounded-full cursor-pointer hover:bg-slate-800 border-2 border-white"
                      onClick={() => inputRef.current.click()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm6 3a3 3 0 110 6 3 3 0 010-6zm0 8a5 5 0 100-10 5 5 0 000 10z" />
                      </svg>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="mb-8 justify-end">
                  <label className="block font-medium mb-1">Name</label>
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      className="w-full pl-3 pr-[200px] py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-md">
              <h3 className="mt-3 font-bold text-[18px]">
                Let's verify your account
              </h3>
              <p className="mt-3">
                We will send you a confirmation code by sms on the next step.
              </p>

              <div className="mb-8 mt-4">
                <label
                  className={`block font-medium mb-1 ${
                    errors.phone ? "text-red-600" : ""
                  }`}
                >
                  Moblie/Phone Number *
                </label>
                <div className="relative w-full max-w-md">
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${
                      errors.phone
                        ? "border-red-600"
                        : "border-gray-400 focus:border-gray-400"
                    }`}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      Invalid phone number
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300"></div>
        <div className="border-t border-gray-300">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`m-9 border p-4 font-semibold text-xl rounded-xl border ${
              isFormValid
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Post now
          </button>
        </div>
      </form>
      {showAlert && (
        <AlertBox
          message="Your form has been submitted successfully!"
          onClose={() => {
            setShowAlert(false);
            resetForm();
          }}
        />
      )}
    </>
  );
};

export default FormValidation;
