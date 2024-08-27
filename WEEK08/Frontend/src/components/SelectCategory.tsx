import { Form, Select } from 'antd';
import './Select.css'
const { Option } = Select;

function SelectCategory() {
    return (
        <div className="SelectCate">
            <Form
                layout="inline"
                initialValues={{
                    category: ''
                }}
                onFinish={(values) => {
                    console.log('Form values:', values);
                }}
            >
                <Form.Item
                    name="category"
                    label="Category"
                >
                    <Select placeholder="Select Product Category">
                        <Option value="laptop">Laptop</Option>
                        <Option value="monitor">Monitor</Option>
                        <Option value="keyboard">Keyboard</Option>
                    </Select>
                </Form.Item>
            </Form>
        </div>
    );
}

export default SelectCategory;
