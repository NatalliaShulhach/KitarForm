import React, { useState } from 'react';
import {
    Form,
    Input,
    Upload,
    Button,
    Select,
    Radio,
    Tag,
    // DatePicker,
    Slider,
    Modal,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './wrapper-form.css';
// import moment from 'moment';

const { TextArea } = Input;

const InterviewForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const FIELDS_FORM = (
        <Form form={form} name="interview form" layout="vertical" preserve={false}>
            {
                <Form.Item label="First name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input first name',
                        },
                    ]}>
                    <Input />
                </Form.Item>
            }
            {
                <Form.Item label="Last name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            }
            {
                <Form.Item
                    label="Gender"
                    name="gender"
                >
                    <Radio.Group>
                        <Radio.Button value="male">Male</Radio.Button>
                        <Radio.Button value="female">Female</Radio.Button>
                        <Radio.Button value="other">Other</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            }
            <Upload
                listType="picture"
                className="upload-list-inline"
                action="http://localhost:3000/"
            >
                <Form.Item label="Photo"
                    name="photo">
                    <Button icon={<UploadOutlined />} className="button-upload">Upload</Button>
                </Form.Item>
            </Upload>
            {
                <Form.Item label="Region"
                    name="region"
                >
                    <Select
                        className="region"
                    >
                        <Select.Option key="minsk" value="Minsk">Minsk</Select.Option>
                        <Select.Option key="brest" value="Brest">Brest</Select.Option>
                        <Select.Option key="vitebsk" value="Vitebsk">Vitebsk</Select.Option>
                        <Select.Option key="gomel" value="Gomel">Gomel</Select.Option>
                        <Select.Option key="grodno" value="Grodno">Grodno</Select.Option>
                        <Select.Option key="mogilev" value="Mogilev">Mogilev</Select.Option>
                    </Select>
                </Form.Item>
            }
            {/* {<Form.Item name="dateInterview" label="Date Time">
                <DatePicker showTime
                    format={"YYYY-MM-DD"}
                    {...moment().utc().startOf('day').add(1, 'day').format("ddd MMM DD YYYY HH:mm:ss")}
                />
            </Form.Item>} */}
            {<Form.Item label="Skills" name="skills">
                <Select
                    mode="tags"
                >
                    <Select.Option value={"html"}><Tag color="magenta">html</Tag></Select.Option>
                    <Select.Option value={"css"}><Tag color="red">css</Tag></Select.Option>
                    <Select.Option value={"js"}><Tag color="volcano">js</Tag></Select.Option>
                    <Select.Option value={"markdown"}><Tag color="gold">react</Tag></Select.Option>
                    <Select.Option value={"git"}><Tag color="lime">git</Tag></Select.Option>
                    <Select.Option value={"github"}><Tag color="green">github</Tag></Select.Option>
                    <Select.Option value={"web"}><Tag color="cyan">web</Tag></Select.Option>
                    <Select.Option value={"other"}><Tag color="blue">other</Tag></Select.Option>
                </Select>
            </Form.Item>}
            {
                <Form.Item name="workExperienceYears" label="Work experience: years">
                    <Slider min={0} max={50} />
                </Form.Item>
            }
            <Form.Item name="workExperienceMonth" label="Work experience: month">
                <Slider min={0} max={11}
                />
            </Form.Item>
            {<Form.Item >Years of work:
                <p>Month of work: </p>
            </Form.Item>}
            {<Form.Item label="Comment" name="comment">
                <TextArea />
            </Form.Item>}
        </Form>
    )

    let getData = async () => {
        let response = await fetch('https://my-json-server.typicode.com/NatalliaShulhach/json/db');
        let data = await response.json();
        form.setFieldsValue(data.candidate)
    }

    const openModalWindow = async () => {
        let data = getData()
        setIsModalVisible(true)
        console.log('data: ', data)
        return data;
    }

    const handleOk = async () => {
        const fieldData = form.getFieldsValue();
        console.log('fieldData:', fieldData)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: fieldData
        };
        fetch('https://my-json-server.typicode.com/NatalliaShulhach/json', requestOptions)
            .then(response => console.log('response', response))
            .catch(data => console.log('error: ', data.status))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button onClick={openModalWindow}>Open Form
            </Button>
            <Modal title="Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
                {FIELDS_FORM}
            </Modal>
        </>
    );
}

export default InterviewForm;