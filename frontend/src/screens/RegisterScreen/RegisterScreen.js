import MainScreen from "../../components/MainScreen";
import { Button, Col, Row, Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import {register} from "../../actions/userActions";

const RegisterScreen=()=>{

    const fileName="upload";
    const navigate=useNavigate();

    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [pic, setPic]=useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState(null)
    const [picMessage,setPicMessage]=useState(null)
    
    const dispatch=useDispatch();

    const userRegister=useSelector((state)=>state.userRegister); 
    const {loading,error,userInfo}=userRegister;

  useEffect(()=>{
    if(userInfo){
      navigate("/");
    }
  },[navigate,userInfo])

    const submitHandler=(e)=>{
      e.preventDefault();
      
      if(password!==confirmpassword){
        setMessage("Passwords do not match")
      }
      else{
        dispatch(register(name,email,password,pic));
      }
    }

    const postDetails=(pics)=>{
      // if(pics ==="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"){
      //   return setPicMessage("Please select an Image");
      //   }
      if (!pics) {
        return setPicMessage('Please Select an Image');
      }
      setPicMessage(null);
      if(pics.type==='image/jpeg'||pics.type==='image/png'){
        const data=new FormData();
        data.append('file',pics);
        data.append("upload_preset", "webNotebook");
        data.append("cloud_name", "roshnimishra");
        fetch("https://api.cloudinary.com/v1_1/roshnimishra/image/upload",{
          method:"post",
          body:data,
        })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err)=>{
          console.log(err);
        });
        
      }else{
        return setPicMessage("Please Select an Image(png/jpeg)");
      }
    };

    return(
        <MainScreen title="REGISTER">
            <div className="loginContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading/>} 
                <Form onSubmit={submitHandler}>
                   <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter Email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}

                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                </Form>  
                <Row className="py-3">
                  <Col>
                    Have an Account ? <Link to="/login">Login</Link>
                  </Col>
                </Row>
            </div> 
        </MainScreen>
    );
};

export default RegisterScreen;
