import React, { useState } from 'react';
import { FormData, Project } from '../types';
import { Input, Select, SelectItem, Button } from "@nextui-org/react";

interface RegistrationFormProps {
  selectedProject: Project | null;
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
  utmSource: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ selectedProject, onSubmit, isSubmitting, utmSource }) => {
  const [formData, setFormData] = useState<FormData>({
    ProjectID: 1,
    ContactChannelID: 21,
    ContactTypeID: 35,
    RefID: 999,
    Fname: '',
    Lname: '',
    Tel: '',
    Email: '',
    Ref: utmSource,
    RefDate: '2024-10-01 09:00',
    FollowUpID: 42,
    utm_source: utmSource,
    PriceInterest: '',
    PurchasePurpose: '',
    FlagPersonalAccept: true,
    FlagContactAccept: true,
    AppointTime: '',
    AppointTimeEnd: '',
  });

  const [invalidFields, setInvalidFields] = useState<Record<string, boolean>>({});
  const [phoneError, setPhoneError] = useState<string>("");

  const validateThaiPhoneNumber = (phone: string): boolean => {
    const mobilePattern = /^(06|08|09)\d{8}$/;
    const landlinePattern = /^0\d{8}$/;
    return mobilePattern.test(phone) || landlinePattern.test(phone);
  };

  const generateDateString = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
    if (name === 'Tel') {
      if (value && !validateThaiPhoneNumber(value)) {
        setPhoneError("กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (เช่น 0812345678)");
        setInvalidFields({ ...invalidFields, Tel: true });
      } else {
        setPhoneError("");
        setInvalidFields({ ...invalidFields, Tel: false });
      }
    }
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedValue = event.target.value;
    const timeArray = selectedValue.split(',');
    
    if (timeArray.length === 2) {
      setFormData(prevData => ({
        ...prevData,
        AppointTime: timeArray[0],
        AppointTimeEnd: timeArray[1]
      }));
      setInvalidFields({ ...invalidFields, AppointTime: false });
    } else {
      console.error('Unexpected value format:', selectedValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['Fname', 'Lname', 'Tel', 'Email', 'AppointTime'];
    const newInvalidFields: Record<string, boolean> = {};
    let isValid = true;

    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newInvalidFields[field] = true;
        isValid = false;
      }
    });

    if (formData.Tel && !validateThaiPhoneNumber(formData.Tel)) {
      newInvalidFields.Tel = true;
      isValid = false;
      setPhoneError("กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (เช่น 0812345678)");
    }

    setInvalidFields(newInvalidFields);

    if (isValid) {
      const updatedFormData = {
        ...formData,
        ProjectID: selectedProject?.projectId || 0,
        RefDate: generateDateString(),
        Ref: utmSource,
        utm_source: utmSource
      };
      onSubmit(updatedFormData);
    }
  };

  return (
    <section id="registerForm" className='py-10'>
      <div className="container">
        <div className="w-full lg:w-2/3 mx-auto">
          <h3 className='text-white text-[30px] lg:text-[40px] leading-none lg:leading-tight text-center mb-4'>ลงทะเบียน{ selectedProject?.project ? ' '+selectedProject.project : '' }</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-4">
              <div className='w-1/2'>
                <Input 
                  type='text' 
                  label='ชื่อ' 
                  name='Fname' 
                  value={formData.Fname} 
                  isRequired 
                  isInvalid={invalidFields.Fname}
                  errorMessage={invalidFields.Fname ? "กรุณากรอกชื่อ" : ""}
                  onChange={handleChange} 
                  radius='sm' 
                  labelPlacement='outside'
                />
              </div>
              <div className='w-1/2'>
                <Input 
                  type='text' 
                  label='นามสกุล' 
                  name='Lname' 
                  value={formData.Lname} 
                  isRequired 
                  isInvalid={invalidFields.Lname}
                  errorMessage={invalidFields.Lname ? "กรุณากรอกนามสกุล" : ""}
                  onChange={handleChange} 
                  radius='sm' 
                  labelPlacement='outside'
                />
              </div>
            </div>
            <div>
              <Input 
                type='tel'
                label='เบอร์โทรศัพท์' 
                name='Tel' 
                value={formData.Tel} 
                isRequired 
                isInvalid={invalidFields.Tel}
                errorMessage={invalidFields.Tel ? (phoneError || "กรุณากรอกเบอร์โทรศัพท์") : ""}
                onChange={handleChange} 
                radius='sm' 
                labelPlacement='outside'
                placeholder="0812345678"
              />
            </div>
            <div>
              <Input 
                type='email' 
                label='อีเมล' 
                name='Email' 
                value={formData.Email} 
                isRequired 
                isInvalid={invalidFields.Email}
                errorMessage={invalidFields.Email ? "กรุณากรอกอีเมล" : ""}
                onChange={handleChange} 
                radius='sm' 
                labelPlacement='outside'
              />
            </div>
            <div className='mb-5'>
              <Select
                isRequired
                label="ช่วงเวลาที่สะดวกให้ติดต่อกลับ"
                onChange={handleSelectChange}
                className="w-full"
                radius='sm'
                labelPlacement='outside'
                isInvalid={invalidFields.AppointTime}
                errorMessage={invalidFields.AppointTime ? "กรุณาเลือกช่วงเวลา" : ""}
              >
                <SelectItem key="09:00,12:00" value="09:00,12:00">
                  09:00 - 12:00 น.
                </SelectItem>
                <SelectItem key="12:00,13:00" value="12:00,13:00">
                  12:00 - 13:00 น.
                </SelectItem>
                <SelectItem key="13:00,16:00" value="13:00,16:00">
                  13:00 - 16:00 น.
                </SelectItem>
                <SelectItem key="16:00,18:00" value="16:00,18:00">
                  16:00 - 18:00 น.
                </SelectItem>
              </Select>
            </div>
            <div className="flex">
              <Button
                type="submit"
                className="w-[200px] p-2 bg-ci-blue border border-neutral-200 mx-auto text-white rounded-lg hover:bg-blue-600"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;