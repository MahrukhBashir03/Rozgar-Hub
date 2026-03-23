import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "../app/context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WorkerRegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cnic: "",
    skill: "",
    rate: "",
    experience: "",
    city: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const skills = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Mason",
    "Painter",
    "AC Technician",
    "House Cleaner",
    "Cook",
    "Driver",
    "Gardener",
    "Tailor",
    "Beautician",
    "Welder",
    "Mechanic",
    "Other",
  ];

  const cities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Other",
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "name",
      "phone",
      "cnic",
      "skill",
      "rate",
      "experience",
      "city",
    ];

    const emptyField = requiredFields.find(
      (field) => !formData[field]
    );

    if (emptyField) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.cnic.length !== 13) {
      setError("CNIC must be 13 digits");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          phone: "",
          cnic: "",
          skill: "",
          rate: "",
          experience: "",
          city: "",
        });
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass-card w-full max-w-lg p-6 lg:p-8 animate-scale-in relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-primary/20 mb-4">
            <svg
              className="w-8 h-8 text-primary-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Join as a Worker</h2>
          <p className="text-muted-foreground">
            Create your profile and start earning
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-center">
            ✓ Registration successful! Your profile is being verified.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnic">CNIC Number *</Label>
            <Input
              id="cnic"
              value={formData.cnic}
              onChange={(e) =>
                handleChange(
                  "cnic",
                  e.target.value.replace(/\D/g, "").slice(0, 13)
                )
              }
            />
            <p className="text-xs text-muted-foreground">
              13 digits without dashes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Skill *</Label>
              <Select
                value={formData.skill}
                onValueChange={(value) =>
                  handleChange("skill", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>City *</Label>
              <Select
                value={formData.city}
                onValueChange={(value) =>
                  handleChange("city", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            variant="heroPrimary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Profile...
              </>
            ) : (
              "Create Worker Profile"
            )}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-secondary hover:underline font-medium"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default WorkerRegisterModal;
