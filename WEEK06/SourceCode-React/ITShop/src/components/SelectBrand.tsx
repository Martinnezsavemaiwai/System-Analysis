import { Form, Select } from 'antd';
import './Select.css'
const { Option } = Select;

function SelectBrand() {
    return (
        <div className="SelectBrand">
            <Form
                layout="inline"
                initialValues={{
                    brand: ''
                }}
                onFinish={(values) => {
                    console.log('Form values:', values);
                }}
            >
                <Form.Item
                    name="brand"
                    label="Brand"
                >
                    <Select placeholder="Select Product Brand">
                        <Option value="asus">ASUS</Option>
                        <Option value="acer">ACER</Option>
                        <Option value="dell">DELL</Option>
                    </Select>
                </Form.Item>
            </Form>
        </div>
    );
}

export default SelectBrand;
