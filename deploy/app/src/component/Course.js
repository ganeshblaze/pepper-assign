import React , { Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Axios from 'axios';

const apiUrl = "http://localhost:3000";


class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseList : []
        };
    }

    componentDidMount (){
            axios
            .get(`${apiUrl}/course`)
            .then(response => {
                console.log(response);
                if(response.statusText === 'OK'){
                    this.setState({
                        courseList : response.data
                    });
                }else {
                    window.alert('Data not loaded');
                }
            })
            .catch(err => console.log(err));
    }

    delete(id){
        console.log(id);
        const status = window.confirm ( ' Are you sure, you want to delete id ' + id);
        if(status) {
            Axios   
            .delete(`${apiUrl}/course/` + id)
            .then('Successfully deleted the item..')
            .catch(err => console.log(err));
            window.location = "http://localhost:3001";
        }else{
            return null;
        }     
        
    }
    render(){
        return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="jumbotron text-center">
                        <h1>Blogs </h1>
                    </div>
                </div>
            </div>

            <div className="row">
                {
                    this.state.courseList.map (x => (
            <div className="well" key={x.id}>
                <div>
      <div className="media">
      	<p className="pull-left">
    		<img className="media-object-responsive" src={x.img} alt="text"/> 
  		</p>
  		<div className="media-body">
    		<h4 className="media-heading">{x.title} </h4>
          <p className="text-right">By {x.name}</p>
          <p>{x.body}</p>
          <ul className="list-inline list-unstyled">
  		
            <li>|</li>
            <span><i className="glyphicon glyphicon-comment"></i>{x.comments}</span>
            <li>|</li>
            <li>
               <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star-empty"></span>
            </li>
            <li>|</li>
            <li>
           
                     <span><i className="fa fa-facebook-square"></i></span>
                    <span><i className="fa fa-twitter-square"></i></span>
                    <span><i className="fa fa-google-plus-square"></i></span>
            </li>
			</ul>
       </div>
    </div>
  
                <div className="panel-footer">
                     <Link className="btn btn-primary" to={"/edit/" + x.id }>Edit</Link>
                        <button onClick={this.delete.bind(this, x.id)}
                                          className="btn btn-danger">Delete</button>
                 </div>
             </div>
         </div>
                ))}
            
            </div>  
        </div>
        )
    }
}

export default Course;