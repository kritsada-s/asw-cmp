import React, { useState } from 'react';
import { FormData, Project } from '../types';
import { Input, Select, SelectItem, Button } from "@nextui-org/react";

interface RegistrationFormProps {
  selectedProject: Project | null;
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ selectedProject, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    ProjectID: 1,
    ContactChannelID: 21,
    ContactTypeID: 35,
    RefID: 999,
    Fname: '',
    Lname: '',
    Tel: '',
    Email: '',
    Ref: 'buffet999',
    RefDate: '2024-10-01 09:00',
    FollowUpID: 42,
    utm_source: 'buffet999',
    PriceInterest: '',
    PurchasePurpose: '',
    FlagPersonalAccept: true,
    FlagContactAccept: true,
    AppointTime: '',
    AppointTimeEnd: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, AppointTime: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, ProjectID: selectedProject?.projectId || 0 });
  };

  return (
    <section id="registerForm" className='py-10'>
      <div className="container">
        <div className="w-full lg:w-2/3 mx-auto">
          <h3 className='text-white text-[40px] leading-tight text-center mb-4'>ลงทะเบียน{ selectedProject?.project ? ' '+selectedProject.project : '' }</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-4">
              <div className='w-1/2'>
                <Input type='text' label='ชื่อ' name='Fname' value={formData.Fname} required onChange={handleChange} radius='sm' labelPlacement='outside'/>
              </div>
              <div className='w-1/2'>
                <Input type='text' label='นามสกุล' name='Lname' value={formData.Lname} required onChange={handleChange} radius='sm' labelPlacement='outside'/>
              </div>
            </div>
            <div>
              <Input type='text' label='เบอร์โทรศัพท์' name='Tel' value={formData.Tel} required onChange={handleChange} radius='sm' labelPlacement='outside'/>
            </div>
            <div>
              <Input type='email' label='อีเมล' name='Email' value={formData.Email} required onChange={handleChange} radius='sm' labelPlacement='outside'/>
            </div>
            <div className='mb-5'>
              <Select
                label="ช่วงเวลาที่สะดวกให้ติดต่อกลับ"
                onChange={handleSelectChange}
                className="w-full"
                radius='sm'
                labelPlacement='outside'
              >
                <SelectItem key="morning" value="morning">
                  Morning
                </SelectItem>
                <SelectItem key="afternoon" value="afternoon">
                  Afternoon
                </SelectItem>
                <SelectItem key="evening" value="evening">
                  Evening
                </SelectItem>
              </Select>
            </div>
            <div className="flex">
              <button type="submit" className="w-[200px] p-2 bg-ci-blue border border-neutral-200 mx-auto text-white rounded-lg hover:bg-blue-600">
                ลงทะเบียน
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;