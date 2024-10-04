
import React from 'react'
import { Form, FormGroup, FormItem, Label, Input, Option, TextArea, CheckBox, Select, FlexBox, Button } from '@ui5/webcomponents-react';
import { Link } from 'react-router-dom';
const EditForm = () => {

  const submitBtn = () => {
    console.log('Form submitted');
  }
  return (
    <div>
      <FlexBox
        alignContent="center"
        direction="Row"
        justifyContent="End"
        maxWidth="100%"
        style={{ padding: "0.7em", gap: "0.5rem" }}
      >
        <Button onClick={submitBtn}>Submit</Button>
        <Link to="/">
          <Button >Cencel</Button>
        </Link>
      </FlexBox>
      <Form
        headerText="Test Form"
        labelSpan="S12 M4 L4 XL4"
        layout="S1 M1 L2 XL2"
      >
        <FormGroup >
          <FormItem labelContent={<Label>RECEIVERNAME</Label>}>
            <Input className="FORMRECEIVERNAME" value="dfdfd" type="Text" />
          </FormItem>
          <FormItem labelContent={<Label>Address</Label>}>
            <Input type="Text" />
          </FormItem>

          <FormItem
            className="formAlignLabelStart"
            labelContent={<Label>Additional Comment</Label>}
          >
            <TextArea
              placeholder="The label is aligned to start by setting `<class>::part(label){  align-self: start; }` "
              rows={5}
            />
          </FormItem>
          <FormItem labelContent={<Label>Home address</Label>}>
            <CheckBox checked />
          </FormItem>

        </FormGroup>
        <FormGroup>
          <FormItem labelContent={<Label>Company Name</Label>}>
            <Input type="Text" />
          </FormItem>
          <FormItem labelContent={<Label>Company Address</Label>}>
            <Input type="Text" />
          </FormItem>
          <FormItem labelContent={<Label>Company City</Label>}>
            <Input type="Text" />
          </FormItem>
          <FormItem labelContent={<Label>Company Country</Label>}>
            <Input type="Text" />
          </FormItem>
          <FormItem labelContent={<Label>Number of Employees</Label>}>
            <Input
              disabled
              type="Number"
              value="5000"
            />
          </FormItem>
          <FormItem labelContent={<Label>Member of Partner Network</Label>}>
            <CheckBox checked />
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  )
}

export default EditForm





