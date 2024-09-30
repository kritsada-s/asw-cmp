import React, { useState } from 'react';
import { Box, TextField, Button, InputLabel, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

interface RegisterFormProps {
  onSubmit: (formData: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    contact_time: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (event: SelectChangeEvent<number>) => {
    setSelectedTime(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="form" className='py-14'>
      <div className="container">
        <div className="lg:w-2/3 mx-auto">
          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <Box flex={1}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box flex={1}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                margin="normal"
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mt={2}>
              <FormControl variant="outlined" style={{ minWidth: 100 }} fullWidth>
                <InputLabel>ช่วงเวลาที่สะดวกให้ติดต่อกลับ</InputLabel>
                <Select
                  value={selectedTime}
                  onChange={handleTimeChange}
                  label="ช่วงเวลาที่สะดวกให้ติดต่อกลับ"
                >
                  <MenuItem value={0}>09:00-12:00</MenuItem>
                  <MenuItem value={1}>12:00-13:00</MenuItem>
                  <MenuItem value={2}>13:00-15:00</MenuItem>
                  <MenuItem value={3}>15:00-18:00</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                ลงทะเบียน
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;