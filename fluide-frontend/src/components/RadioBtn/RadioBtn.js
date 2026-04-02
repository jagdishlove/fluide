
import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { FormControl } from '@mui/base';
import { RadioGroup } from '@mui/material';

const RadioBtn = () => {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    const controlProps = (item) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: 'color-radio-button-demo',
      inputProps: { 'aria-label': item },
    });
  return (
    <div>
        <FormControl> <RadioGroup> <Radio
        {...controlProps('e')}
        sx={{
            color: 'black',
            '&.Mui-checked': {
              color: 'black',
            },
          }}
      /></RadioGroup></FormControl>
 

  </div>
  )
}

export default RadioBtn