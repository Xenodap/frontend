import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  let navigate = useNavigate();

  //요청주소의 id값을 받음
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };

  const { name, username, email } = user;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("수정");
    await axios.put(`http://localhost:8080/user/${id}`, user);
    navigate("/");
  };

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //구조 분해 할당=(name 사용하면 user.name으로 됨)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">수정 하기</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                required
                type="text"
                id="name"
                value={name}
                onChange={onInputChange}
                className="form-control"
                placeholder="이름 입력"
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                닉네임
              </label>
              <input
                required
                type="text"
                id="username"
                value={username}
                onChange={onInputChange}
                className="form-control"
                placeholder="닉네임"
                name="username"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                required
                type="text"
                id="email"
                value={email}
                onChange={onInputChange}
                className="form-control"
                placeholder="이메일"
                name="email"
              />
            </div>

            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 mx-2"
              >
                수정
              </button>
              <Link
                to="/"
                type="reset"
                className="btn btn-outline-danger px-3 mx-2"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
