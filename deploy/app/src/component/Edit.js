import React , { Component} from 'react';
import Axios from 'axios';


const apiUrl = 'http://localhost:3000';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId : this.props.match.params.id,
            id : 0,
            name : '',
            title : '' ,
            body : ''
        };
        this.updateCourse =this.updateCourse.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);

    }

    updateCourse(e){
        e.preventDefault();
     const body = {
         id : this.state.id,
         name : this.state.name,
         title : this.state.title,
         img : this.state.img,
         body : this.state.body
     };
      
     console.log(body);
     Axios.put(apiUrl + '/course/' + this.state.courseId, body)
     .then(res => alert ( " Successfully updated Blog"))
     .catch(err => console.log(err));
     window.location = 'http://localhost:3001';

    }

    onChangeId (e) {
        this.setState({
            id : e.target.value
        });
    }

    onChangeName (e) {
        this.setState({
            name : e.target.value
        });
    }

    onChangeTitle (e) {
        this.setState({
            title : e.target.value
        });
    }

    onChangeBody (e) {
        this.setState({
            body : e.target.value
        });
    }

    onChangeImage (e) {
        this.setState({
            img : e.target.value
        });
    }

    componentDidMount(){
        Axios.get(`${apiUrl} /course/` + this.state.courseId)
        .then(res => {
            console.log(res.data);
            this.setState({
                id : res.data.id,
                name : res.data.name,
                title : res.data.title,
                img : res.data.img,
                body : res.data.body

            });
        })
        .catch(err => console.log(err));
    }

    

    
    render(){
        return(
            <div className="container">
            <div className="row">
            <div className="col-md-12">
                <div className="jumbotron text-center">
                    <h1> Edit Course</h1>
                </div>
            </div>
            <div className="col-md-offset-3 col-md-6 well">
                <form onSubmit ={this.updateCourse}>
                    <div className="form-group">
                        <label> ID  </label>
                        <input type="number" 
                        name="id" 
                        id="id"
                         className="form-control"
                         readOnly
                        value={this.state.id}
                        onChange={this.onChangeId}></input>
                    </div>
                    
                    <div className="form-group">
                        <label> Name </label>
                        <input type="text"
                         name="name" 
                         id="name"
                          className="form-control"
                          value={this.state.name}
                          onChange ={ this.onChangeName}></input>
                    </div>

                    <div className="form-group">
                        <label> Title of the blog  </label>
                        <input type="text"
                         name="title"
                          id="title"
                           className="form-control"
                           value = {this.state.title}
                           onChange = {this.onChangeTitle}></input>
                    </div>

                    <div className="form-group">
                            <label> Enter Image URL (only 640*480 size) </label>
                            <input type="text" 
                            name="img"
                             id="img"
                              className="form-control" 
                              value={this.state.img}
                              onChange = {this.onChangeImage}
                              ></input>
                        </div>

                    <div className="form-group">
                        <label> Body </label>
                     <textarea className="form-control rounded-0"
                      id="body"
                      name="body" 
                      type="text"
                    rows="3" placeholder="description"
                    value = {this.state.body}
                    onChange = {this.onChangeBody}>
                         </textarea>
                 </div>
                    <div className="form-group">
                        <button type="Submit" className="btn btn-success">Update</button>
                    </div>

                </form>
            </div>
        </div>
        </div>

        )
    }
}

export default Edit;