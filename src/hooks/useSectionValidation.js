import { useState, useMemo } from 'react';

export const useSectionAValidation = (data) => {
    const [errors, setErrors] = useState({});

    const validateStep = () => {
        const newErrors = {};
        let isValidStep = true;

        if (!data.fullName?.trim() || !/^[a-zA-Zа-яА-ЯёЁ\s\-äöüÄÖÜß.]+$/.test(data.fullName)) {
            newErrors.fullName = true;
            isValidStep = false;
        }
        if (!data.occupation?.trim()) {
            newErrors.occupation = true;
            isValidStep = false;
        }
        if (!data.birthday || !/^\d{2}\.\d{2}\.\d{4}$/.test(data.birthday)) {
            newErrors.birthday = true;
            isValidStep = false;
        }
        if (!data.maritalStatus?.trim()) {
            newErrors.maritalStatus = true;
            isValidStep = false;
        }
        if (!data.phone || data.phone.length < 7) {
            newErrors.phone = true;
            isValidStep = false;
        }
        if (!data.address?.trim()) {
            newErrors.address = true;
            isValidStep = false;
        }

        setErrors(newErrors);
        return isValidStep;
    };

    const clearError = (field) => {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const isFormValid = useMemo(() => {
        if (!data.fullName?.trim() || !/^[a-zA-Zа-яА-ЯёЁ\s\-äöüÄÖÜß.]+$/.test(data.fullName)) return false;
        if (!data.occupation?.trim()) return false;
        if (!data.birthday || !/^\d{2}\.\d{2}\.\d{4}$/.test(data.birthday)) return false;
        if (!data.maritalStatus?.trim()) return false;
        if (!data.phone || data.phone.length < 7) return false;
        if (!data.address?.trim()) return false;
        return true;
    }, [data]);

    return { errors, validateStep, clearError, isFormValid };
};