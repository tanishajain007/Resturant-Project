import { useEffect, useState } from "react";
import FoodStore from "../../store/FoodStore";
import { useParams } from "react-router-dom";

const CreateMenu = () => {
    const { id } = useParams();

    const [form, setForm] = useState({
        name: "",
        discription: "",
        category: "",
        price: "",
        isavailable: true,
    });

    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [mode, setMode] = useState(true);

    const {
        createFoodMenu,
        getOnefood,
        updateFoodMenu,
    } = FoodStore();

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // HANDLE AVAILABILITY
    // =========================
    const handleAvailability = (e) => {
        setForm((prev) => ({
            ...prev,
            isavailable: e.target.value === "true",
        }));
    };

    // =========================
    // HANDLE IMAGES
    // =========================
    const addFiles = (files) => {
        const selectedFiles = Array.from(files);

        // Store actual File objects
        setImages(selectedFiles);

        // Create previews
        const previewUrls = selectedFiles.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviews(previewUrls);
    };

    // =========================
    // UPDATE FOOD
    // =========================
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            const result = await updateFoodMenu({
                id: id,
                name: form.name,
                discription: form.discription,
                category: form.category,
                price: form.price,
                isavailable: form.isavailable,
            });

            if (result?.success) {
                alert(result.message);
            }

        } catch (error) {
            console.error("UPDATE ERROR:", error);

            alert(
                error?.response?.data?.message ||
                "Food menu could not be updated"
            );
        } finally {
            setSubmitting(false);
        }
    };

    // =========================
    // CREATE FOOD
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("discription", form.discription);
            formData.append("category", form.category);
            formData.append("price", form.price);
            formData.append(
                "isavailable",
                String(form.isavailable)
            );

            images.forEach((image) => {
                formData.append("foodImage", image);
            });

            console.log("========== FORM DATA ==========");

            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }

            console.log("================================");

            const response = await createFoodMenu(formData);

            console.log("CREATE RESPONSE:", response);

            if (response?.success) {
                setForm({
                    name: "",
                    discription: "",
                    category: "",
                    price: "",
                    isavailable: true,
                });

                setImages([]);
                setPreviews([]);

                const fileInput =
                    document.getElementById("fileInput");

                if (fileInput) {
                    fileInput.value = "";
                }
            }

        } catch (error) {
            console.error(
                "CREATE FOOD ERROR:",
                error.response?.data || error
            );
        } finally {
            setSubmitting(false);
        }
    };

    // =========================
    // GET ONE FOOD FOR UPDATE
    // =========================
    useEffect(() => {
        const loadFood = async () => {
            if (!id) {
                setMode(true);
                return;
            }

            setMode(false);

            try {
                console.log("EDIT FOOD ID:", id);

                const value = await getOnefood(id);

                console.log("FOOD RECEIVED:", value);

                if (!value) {
                    console.log("No food data received");
                    return;
                }

                setForm({
                    name: value.name || "",
                    discription: value.discription || "",
                    category: value.category?.toLowerCase() || "",
                    price: value.price || "",
                    isavailable: value.isavailable ?? true,
                });

            } catch (error) {
                console.error(
                    "GET FOOD ERROR:",
                    error.response?.data || error
                );
            }
        };

        loadFood();
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10 px-4">

            <div className="max-w-3xl mx-auto">

                {/* HEADER */}
                <div className="mb-8">

                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">

                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>

                        Menu Management

                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">

                        {mode
                            ? "Create New Menu"
                            : "Update Menu"}

                    </h1>

                    <p className="text-gray-500 mt-2">

                        {mode
                            ? "Add a delicious new item to your food menu."
                            : "Update the details of your menu item."}

                    </p>

                </div>


                {/* FORM CARD */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* CARD HEADER */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-6">

                        <h2 className="text-white text-xl font-semibold">
                            Food Details
                        </h2>

                        <p className="text-orange-100 text-sm mt-1">
                            Fill in all the information below
                        </p>

                    </div>


                    <form
                        className="p-8 space-y-7"
                        onSubmit={
                            mode
                                ? handleSubmit
                                : handleUpdate
                        }
                    >

                        {/* NAME */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Food Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Paneer Tikka"
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* DISCRIPTION */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="discription"
                                value={form.discription}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe the food item..."
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none resize-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* PRICE + CATEGORY */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* PRICE */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                        min="0"
                                        required
                                        className="w-full border border-gray-300 rounded-xl pl-9 pr-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                    />

                                </div>

                            </div>


                            {/* CATEGORY */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="breakfast">
                                        Breakfast
                                    </option>

                                    <option value="lunch">
                                        Lunch
                                    </option>

                                    <option value="dinner">
                                        Dinner
                                    </option>

                                    <option value="snacks">
                                        Snacks
                                    </option>

                                    <option value="beverages">
                                        Beverages
                                    </option>

                                    <option value="dessert">
                                        Dessert
                                    </option>

                                    <option value="all">
                                        All
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* AVAILABILITY */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Availability
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* AVAILABLE */}
                                <label
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${form.isavailable
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 hover:border-green-300"
                                        }`}
                                >

                                    <input
                                        type="radio"
                                        name="availability"
                                        value="true"
                                        checked={
                                            form.isavailable === true
                                        }
                                        onChange={handleAvailability}
                                        className="w-5 h-5 accent-green-600"
                                    />

                                    <div>

                                        <p className="font-semibold text-green-700">
                                            Available
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Food can be ordered
                                        </p>

                                    </div>

                                </label>


                                {/* UNAVAILABLE */}
                                <label
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${!form.isavailable
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-200 hover:border-red-300"
                                        }`}
                                >

                                    <input
                                        type="radio"
                                        name="availability"
                                        value="false"
                                        checked={
                                            form.isavailable === false
                                        }
                                        onChange={handleAvailability}
                                        className="w-5 h-5 accent-red-600"
                                    />

                                    <div>

                                        <p className="font-semibold text-red-700">
                                            Unavailable
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Food cannot be ordered
                                        </p>

                                    </div>

                                </label>

                            </div>

                        </div>


                        {/* IMAGES */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Food Images
                            </label>

                            <div
                                onClick={() =>
                                    document
                                        .getElementById("fileInput")
                                        .click()
                                }
                                className="border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 rounded-2xl p-8 text-center cursor-pointer transition"
                            >

                                <div className="text-gray-400">

                                    <div className="text-4xl mb-3">
                                        📸
                                    </div>

                                    <p className="text-sm font-medium text-gray-600">
                                        Click to upload images
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        PNG or JPG • Multiple images allowed
                                    </p>

                                </div>

                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    multiple
                                    hidden
                                    onChange={(e) =>
                                        addFiles(e.target.files)
                                    }
                                />

                            </div>


                            {/* PREVIEWS */}
                            {previews.length > 0 && (

                                <div className="mt-5">

                                    <div className="flex items-center justify-between mb-3">

                                        <p className="text-sm font-semibold text-gray-700">
                                            Selected Images
                                        </p>

                                        <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">

                                            {previews.length} image
                                            {previews.length > 1
                                                ? "s"
                                                : ""}

                                        </span>

                                    </div>


                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                        {previews.map((src, index) => (

                                            <div
                                                key={src}
                                                className="relative group"
                                            >

                                                <img
                                                    src={src}
                                                    alt={`preview-${index}`}
                                                    className="w-full h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => {

                                                        const newImages =
                                                            images.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            );

                                                        const newPreviews =
                                                            previews.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            );

                                                        setImages(
                                                            newImages
                                                        );

                                                        setPreviews(
                                                            newPreviews
                                                        );
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition shadow"
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-gray-100">

                            <button
                                type="button"
                                onClick={() =>
                                    window.history.back()
                                }
                                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
                            >

                                {submitting
                                    ? mode
                                        ? "Uploading..."
                                        : "Updating..."
                                    : mode
                                        ? "Create Menu Item"
                                        : "Update Menu"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateMenu;