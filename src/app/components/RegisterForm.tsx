import React, { useState } from 'react';
import { FormData, Project } from '../types';
import { Input, Select, SelectItem, Button, Checkbox, cn } from "@nextui-org/react";
import Link from 'next/link';

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
    AppointTime: "N/A",
    AppointTimeEnd: "N/A",
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
      console.log(value);
      
      if (value === "") {
        setPhoneError("กรุณากรอกเบอร์โทรศัพท์");
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
      //setInvalidFields({ ...invalidFields, AppointTime: false });
    } 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['Fname', 'Lname', 'Tel', 'Email'];
    const newInvalidFields: Record<string, boolean> = {};
    let isValid = true;

    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newInvalidFields[field] = true;
        isValid = false;
      }
    });

    if (formData.Tel === "") {
      newInvalidFields.Tel = true;
      isValid = false;
      setPhoneError("กรุณากรอกเบอร์โทรศัพท์");
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
    <form onSubmit={handleSubmit}>
      <section id="registerForm" className='py-10'>
        <div className="container">
          <div className="w-full lg:w-2/3 mx-auto">
          <h3 className='text-white text-[30px] lg:text-[40px] leading-none lg:leading-tight text-center mb-4'>ลงทะเบียน{ selectedProject?.project ? ' '+selectedProject.project : '' }</h3>
          <div className="flex flex-col gap-3">
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
                errorMessage={invalidFields.Tel ? (phoneError || "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง") : ""}
                onChange={handleChange} 
                radius='sm' 
                labelPlacement='outside'
                //placeholder="0812345678"
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
                //isRequired
                label="ช่วงเวลาที่สะดวกให้ติดต่อกลับ"
                onChange={handleSelectChange}
                className="w-full"
                radius='sm'
                labelPlacement='outside'
                //isInvalid={invalidFields.AppointTime}
                //errorMessage={invalidFields.AppointTime ? "กรุณาเลือกช่วงเวลา" : ""}
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
            
          </div>
        </div>
        </div>
      </section>
      <section id="terms">
        <div className="container">
          <div className='terms-container w-full md:w-1/2 md:mx-auto pt-7'>
            <p className='text-[18px] text-balance leading-tight'><Checkbox isSelected={true} size='sm'/>บริษัทฯ จะจัดเก็บข้อมูลของท่าน เพื่อการติดต่อแจ้งข้อมูลข่าวสารที่เกี่ยวข้องกับ ผลิตภัณฑ์ บริการของบริษัทฯ และนำเสนอโครงการที่น่าสนใจ คลิกที่นี่เพื่อดู <Link href="https://assetwise.co.th/privacy-policy/" target='_blank' title='' className='underline text-ci-blue'>นโยบายความเป็นส่วนตัว</Link> และ <Link href={{ pathname:'https://assetwise.co.th/terms-and-conditions/campaign-promotion/', query: { 'utm_source': 'Tumthung_13Jan25' } }} target='_blank' className='underline text-ci-blue'>ข้อมูลเงื่อนไขเพิ่มเติม</Link></p>
          </div>
          <div className='button-container flex w-full py-5 justify-center'>
            <Button
              type="submit"
              className="min-w-[200px] h-auto p-2 bg-ci-blue-2 border-3 text-3xl border-[#0069BD] mx-auto text-white rounded-lg hover:bg-ci-blue-2"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
            </Button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default RegistrationForm;