import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { list, removeBlog } from '../../actions/blogAction';
import moment from 'moment';

const BlogRead = ({ username }) => {
	const [blogs, setBlogs] = useState([]);
	const [message, setMessage] = useState('');
	const token = getCookie('token');

	useEffect(() => {
		loadBlogs();
	}, []);

	const loadBlogs = () => {
		list(username).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setBlogs(data);
			}
		});
	};

	const deleteBlog = (slug) => {
		removeBlog(slug, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setMessage(data.message);
				loadBlogs();
			}
		});
	};

	const deleteConfirm = (slug) => {
		let answer = window.confirm(
			'Cette opération est irréversible, Etes-vous sur de vouloir supprimer cet article ?'
		);
		if (answer) {
			deleteBlog(slug);
		}
	};

	const showAllBlogs = () => {
		return blogs.map((blog, i) => {
			return (
				<div key={i} className='pb-3'>
					<h3>{blog.title}</h3>
					<p className='mark'>
						Ecrit par {blog.postedBy.username} | Publié{' '}
						{moment(blog.updatedAt).fromNow()}
					</p>
					<button
						className='btn btn-sm btn-danger'
						onClick={() => deleteConfirm(blog.slug)}>
						Supprimer
					</button>
					{showUpdateButton(blog)}
				</div>
			);
		});
	};

	const showUpdateButton = (blog) => {
		if (isAuth() && isAuth().role === 0) {
			return (
				<Link href={`/user/crud/${blog.slug}`}>
					<a className='btn btn-sm btn-warning ml-1'>Modifier</a>
				</Link>
			);
		} else if (isAuth() && isAuth().role === 1) {
			return (
				<Link href={`/admin/crud/${blog.slug}`}>
					<a className='btn btn-sm btn-warning ml-1'>Modifier</a>
				</Link>
			);
		}
	};

	return (
		<>
			<div className='row'>
				<div className='col-md-12'>
					{message && (
						<div className='alert alert-warning'>{message}</div>
					)}
					{showAllBlogs()}
				</div>
			</div>
		</>
	);
};

export default BlogRead;
