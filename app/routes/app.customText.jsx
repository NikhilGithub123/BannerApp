import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldExample() {
  const [value, setValue] = useState('Nikhil Gupta');

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}

export default TextFieldExample;