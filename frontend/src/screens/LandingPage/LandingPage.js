import {Container, Button, Row} from "react-bootstrap";
import "./LandingPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage=()=>{

    const navigate=useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo}=userLogin;
    useEffect(()=>{
        if(userInfo){
            navigate("/mynotes");
        }
    },[navigate,userInfo]);


    return(
        <div className="main">
            <Container>
                <Row >
                    <div className="intro-text">
                        <div>
                            <h1 className="title">Welcome to cloudNotebook</h1>
                            <p className="subtitle">Keep your notes safe and accessible anywhere with our cloud notebook.</p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button size="lg" className="landingbutton">
                                    Log In
                                </Button>
                            </a>
                            <a href="/register" >
                                <Button size="lg" className="landingbutton">
                                    Sign Up
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;