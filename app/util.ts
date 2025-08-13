import z from "zod";
export const organisationTypes = [
  "Type of Organization",
  "1. Proprietary / एकल स्वामित्व",
  "2. Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)",
  "3. Partnership / पार्टनरशिप",
  "4. Co-Operative / सहकारी",
  "5. Private Limited Company / प्राइवेट लिमिटेड कंपनी",
  "6. Public Limited Company / पब्लिक लिमिटेड कंपनी",
  "7. Self Help Group / स्वयं सहायता समूह",
  "8. Limited Liability Partnership / सीमित दायित्व भागीदारी",
  "9. Society / सोसाइटी",
  "10. Trust / ट्रस्ट",
  "11. Others / अन्य",
];

const AadhaarSchema = z
  .string()
  .regex(/^[2-9]{1}[0-9]{11}$/, "Invalid Aadhaar number")
  .length(12, "Aadhaar must be exactly 12 digits");

//    1)There is error in Aadhaar Validation/Authentication.
// Error Code: Invalid Auth XML format. 510
// 2) Your Aadhaar has not been validated hence you cannot register Udyam.
// 3) Please Visit Your Nearest Aadhaar Enrolment Centre.

export const AadhaarBodySchema = z.object({
  aadhaarName: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot be larger than 100 characters"),
  aadhaar: AadhaarSchema,
});

export const PanBodySchema = z.object({
  aadhaar: AadhaarSchema,
  panName: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format" }),
  type: z
    .string()
    .regex(/^(?:[1-9]|10|11)$/, { message: "Type must be between 1 and 11" }),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
