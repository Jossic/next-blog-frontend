import Layout from '../components/Layout';
import Link from 'next/link';
import SignupComponent from '../components/auth/SignupComponent';

const Signup = () => {
	return (
		<Layout>
			<h2 className='text-center pt-4 pb-4'>Créer un compte</h2>
			<div className='col-md-6 offset-md-3'>
				<SignupComponent />
			</div>
			<Link href='/'>
				<a>Accueil</a>
			</Link>
		</Layout>
	);
};

export default Signup;
