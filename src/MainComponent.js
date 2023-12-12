import { Layout, Row } from 'antd';
import {InputForm} from "./InputForm";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 50,
    paddingInline: 10,
    lineHeight: '4px',
    backgroundColor: 'darkblue!important',
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 700,
    lineHeight: '30px',
    color: '#fff',
    backgroundColor: 'lightgray',
};

const siderStyle= {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

export const MainComponent= () => {
    return (
        <>
            <Layout style={{height:"100vh"}}>
                <Sider style={siderStyle}>Sider</Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <div><p style={{color:'violet',fontSize:'30px'}}>MAIN PAGE</p></div>
                    </Header>
                    <Content style={contentStyle}>
                        <InputForm>

                        </InputForm>
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </>
    )
}