import {TextField, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { createOrUpdateBanner } from "../app.server"
import { authenticate } from "../shopify.server";
import {
  useSubmit,
} from "@remix-run/react";
import {
  PageActions,
  Page,
} from "@shopify/polaris";


export async function action({ request, params }) {
  console.log("inside action ", params);
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const labelProductObjs = {
    ...Object.fromEntries(await request.formData()),
    shop,
  };

  console.log("object ", labelProductObjs)
  const arrayToIterate = [labelProductObjs];
  const result = createOrUpdateBanner(arrayToIterate);
  return result;
}

function TextFieldExample() {
  const [value, setValue] = useState('Demo Banner Of Blackbytt');

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const submit = useSubmit();
  function handleSave() {
    const data = {
      "bannerText": value,
      "topValue": topValue,
      "bottomValue": bottomValue,
      "leftValue": leftValue,
      "rightValue": rightValue,      
    };
    submit(data, { method: "post" });
  }

  const [topValue, setTopValue] = useState(0);
  const [bottomValue, setBottomValue] = useState(0);
  const [rightValue, setRightValue] = useState(0);
  const [leftValue, setLeftValue] = useState(0);

  const handleTopSliderChange = useCallback((value) => {
    setTopValue(value);
  }, []);  


  const handleBottomSliderChange = useCallback((value) => {
    setBottomValue(value);
  }, []);  


  const handleLeftSliderChange = useCallback((value) => {
    setLeftValue(value);
  }, []);  


  const handleRightSliderChange = useCallback((value) => {
    setRightValue(value);
  }, []);  

  return (
    <Page>
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
      <RangeSlider
        output
        label="Top"
        min={0}
        max={1000}
        value={topValue}
        onChange={handleTopSliderChange}
      />
      <RangeSlider
        output
        label="Bottom"
        min={0}
        max={1000}
        value={bottomValue}
        onChange={handleBottomSliderChange}
      />
      <RangeSlider
        output
        label="Left"
        min={0}
        max={1000}
        value={leftValue}
        onChange={handleLeftSliderChange}
      />
      <RangeSlider
        output
        label="Right"
        min={0}
        max={1000}
        value={rightValue}
        onChange={handleRightSliderChange}
      />
    <PageActions
    primaryAction={{
      content: "Save",
      onAction: handleSave,
    }}
  />
  </Page>
  );
}

export default TextFieldExample;