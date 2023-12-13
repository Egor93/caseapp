import {
    Button, Card,
    Col,
    Form,
    Row,
    Switch,
    Upload
} from 'antd';
import {
    DownloadOutlined,
    PlusOutlined,
    UndoOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {Fragment, useEffect, useState} from "react";
import dayjs from "dayjs";
import PreviewModal from "./PreviewModal";
import {cardHeadStyle, cardStyle} from "./CardsStyles";
import PassengerRow from "./PassengerRow";

function PassengerDetails({form, passengers, formTouched}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        wrapperCol={{
            span: 16, //the layout for input controls
        }}
    >
        <Form.List name={"passengers"}>
            {(fields, {add, remove}) => (
                <>
                    {
                        fields.map(({key, name, index, ...restField}) => {
                            return (
                                //all map elements should have key! Docs:special props (ref and key) are used by React
                                <Fragment key={key}>
                                    <Card
                                        style={{
                                            borderStyle: "dashed",
                                            borderWidth: "2px",
                                            margin: -2 //for intersections
                                        }}
                                        bodyStyle={{
                                            padding: 0,
                                        }}>
                                        <PassengerRow
                                            name={name}
                                            remove={remove}
                                            passengerName={name}
                                        />
                                    </Card>
                                </Fragment>
                            )
                        })
                    }
                    <Row>
                        <Col span={4} style={{
                            display: "flex",
                            marginTop: 12,
                            marginBottom: 20
                        }}>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add()
                                }}
                                style={{
                                    backgroundColor: '#bedaf8',

                                }}
                                icon={<PlusOutlined/>}
                            >
                                Add passenger
                            </Button>
                        </Col>
                    </Row>
                </>
            )}

        </Form.List>

        <Row>
            <Col span={4} style={{display: "flex"}}>
                <Form.Item>
                    <Button
                        disabled={!formTouched} //only if some input field is touched, empty row doesnt count
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            form.validateFields() //return promise
                                .then(
                                    () => {
                                        showModal()    //if fullfilled
                                    }
                                ).catch((error) => {
                                console.log(error)
                            })  //if rejected dont do anything, since the required message is shown anyway after .validateFields()
                        }}
                    >
                        Preview changes
                    </Button>
                </Form.Item>
                <PreviewModal
                    passengers={passengers}
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </Col>
            <Col span={4} style={{display: "flex"}}>
                <Form.Item
                    wrapperCol={{
                        offset: 1
                    }}
                >
                    <Button
                        disabled={!form.isFieldsTouched()}  //after any change, even if empty row is added
                        type="primary"
                        style={{
                            backgroundColor: '#8d55a9'
                        }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        <UndoOutlined/> Reset
                    </Button>
                </Form.Item>
            </Col>
        </Row>
    </Form>
}

function SaveDetails({form, saveable}) {
    return (
        <Row>
            <Col span={12}>
                <Upload
                    accept=".json"
                    maxCount={1} //only 1 file can be uploaded, since 1 file is enough to load passenger details
                    beforeUpload={file => {
                        const reader = new FileReader();

                        reader.onload = e => {
                            const contents = e.target.result;
                            // Parse JSON to object and assign to form value
                            const obj = JSON.parse(contents);
                            obj['passengers'] = obj.passengers.filter(passenger => passenger) //filter out possible nulls
                            obj.passengers?.forEach(passenger => {
                                if (passenger.birthdate) {
                                    passenger.birthdate = dayjs(passenger.birthdate);
                                }
                            });
                            form.setFieldsValue(obj);
                        };

                        reader.readAsText(file);

                        // Prevent upload
                        return false;
                    }}
                >
                    <Button>
                        <UploadOutlined/> Load saved details
                    </Button>
                </Upload>
            </Col>
            <Col span={12}>
                <Button
                    disabled={!saveable}
                    onClick={() => {
                        const formData = form.getFieldValue();
                        const filteredPassengers = formData.passengers.filter(passenger => passenger); //prevent writing nulls,undefined to output .json
                        formData.passengers = filteredPassengers;
                        const jsonData = JSON.stringify(formData, null, 2);
                        const blob = new Blob([jsonData], {type: 'application/json'});
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'passengerDetails.json';
                        link.click();
                    }}
                >
                    <DownloadOutlined/> Save passenger details
                </Button>
            </Col>
        </Row>
    )
}


export function InputForm() {
    const [form] = Form.useForm();
    const passengers = Form.useWatch('passengers', form) //watch (and rerender on change) the all input vars
    const [developerView, setDeveloperView] = useState(true)
    const [formTouched, setFormTouched] = useState(false);

    useEffect(() => {
        //if "empty",e.g. undefined or [] or [null]
        if (!passengers || (Array.isArray(passengers) && passengers.every(el => !el))) {
            setFormTouched(false)
        } else {
            setFormTouched(true)
        }
    }, [passengers])

    return (
        <>
            <Card title='Passenger details'
                  headStyle={{
                      ...cardHeadStyle,
                      borderRadius: 0
                  }}
                  style={{
                      ...cardStyle,
                      borderBottomWidth: "2px",
                      borderRadius: 0
                  }}>
                <PassengerDetails
                    passengers={passengers}
                    form={form}
                    formTouched={formTouched}
                />
                <Card title='Save details'
                      headStyle={cardHeadStyle}
                      style={{
                          ...cardStyle,
                          borderWidth: "1px",
                          width: "50%"
                      }}
                      bordered={false}>
                    <SaveDetails
                        form={form}
                        saveable={formTouched}
                    />
                </Card>
            </Card>
            <Row>
                <Col
                    span={4}
                    style={{color: "darkred"}}
                >
                    <div>Toggle developer view</div>
                    <Switch
                        defaultChecked
                        onChange={() => {
                            setDeveloperView(!developerView);
                        }}
                    />
                </Col>
                <Col span={4}
                     style={{color: "darkred"}}
                >
                    {developerView &&
                        <div>
                            <pre>JSON is {JSON.stringify(form.getFieldValue(), null, 2)}
                            </pre>
                            {/*{console.log("Passengers", JSON.stringify(passengers, null, 2))}*/}
                        </div>}
                </Col>
            </Row>
        </>
    )
}