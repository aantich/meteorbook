import React from 'react'
//@ts-ignore
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { CollectionPosts, IPost } from '../api/Post/Post';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export const MainPage = () => {

    const loading = useSubscribe("posts.allPosts")
    const posts = useFind(()=> CollectionPosts.find({}), [])

    console.log(loading(), posts)

    return (
        
        <Container>
        <Row>
            <Col>
            <h3>Welcome to our Blogs!</h3>
            </Col>
        </Row>
        {posts.map((p:IPost,i:number)=> {
            return (
                <Row key={i}>
                    <Col>
                    <h4>{p.title}</h4>
                    <p className="text-muted">
                        {p.createdAt.toString()}
                    </p>
                    <p>
                        {p.content}
                    </p>
                    </Col>
                </Row>
            )
        })}
        </Container>
    )
}