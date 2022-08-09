import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const signupImage = 'https://media.istockphoto.com/photos/start-line-on-the-highway-picture-id665037818?k=20&m=665037818&s=612x612&w=0&h=jYMZ2rNNrHDiEo-dd7dShHmxOMLkJGaBBpIUdsmDm3M=';
const dummyTextAboutSignup = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ paddingTop: '24px', paddingBottom: '24px' }}>
            <Stack alignItems="center" justifyContent="center">
                <Card onClick={() => navigate('/signup')}>
                    <CardActionArea>
                        <CardMedia component="img" height="400" alt="Image to sign up" image={signupImage} />
                        <CardContent sx={{ textAlign: 'left' }}>
                            <Typography gutterBottom variant="h5" component="div">Take the first step</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {dummyTextAboutSignup}
                            </Typography>
                        </CardContent>
                    <CardActions>
                        <Button size="small">Sign up</Button>
                    </CardActions>
                    </CardActionArea>
                </Card>
            </Stack>
        </Container>
    );
};

export default Home;