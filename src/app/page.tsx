'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  TextField,
  Button,
  Box,
  SelectChangeEvent
} from '@mui/material';

interface CardGroups {
  [key: string]: string[];
}

const cardGroups: CardGroups = {
  group1: ['Card 1', 'Card 2', 'Card 3', 'Card 4'],
  group2: ['Card A', 'Card B', 'Card C', 'Card D', 'Card E'],
  group3: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  group4: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'],
  group5: ['Choice A', 'Choice B', 'Choice C', 'Choice D', 'Choice E', 'Choice F', 'Choice G', 'Choice H', 'Choice I', 'Choice J']
};

interface FormData {
  [key: string]: string;
}

const LandingPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('group1');
  const [formFields, setFormFields] = useState<string[]>(['name', 'lastName', 'tel', 'email']);
  const [formData, setFormData] = useState<FormData>({});
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedGroup(event.target.value);
    setSelectedBox(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAddField = () => {
    const newField = `field${formFields.length + 1}`;
    setFormFields([...formFields, newField]);
  };

  const handleBoxClick = (boxValue: string) => {
    setSelectedBox(boxValue);
    setFormData({ ...formData, selectedBox: boxValue });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Select Group</InputLabel>
            <Select
              value={selectedGroup}
              onChange={handleSelectChange}
              label="Select Group"
            >
              {Object.keys(cardGroups).map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          {cardGroups[selectedGroup].map((card, index) => (
            <Box key={index} gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4', lg: 'span 3' }}>
              <Card 
                variant="outlined" 
                onClick={() => handleBoxClick(card)}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedBox === card ? '#FFF3E0' : 'inherit',
                  border: selectedBox === card ? '2px solid orange' : '1px solid rgba(0, 0, 0, 0.12)'
                }}
              >
                <CardContent>
                  <Typography variant="body1">{card}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {formFields.map((field) => (
              <Box key={field} gridColumn="span 12">
                <TextField
                  fullWidth
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Box>
            ))}
            <Box gridColumn="span 12">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default LandingPage;