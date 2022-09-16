import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from "cookie";
import { env } from '$env/dynamic/private';

export async function POST({ request, locals }) {
    const { prisma } = locals;

    // Check input
	const login_data = await request.json();
    // if (!validator.validateLoginInput(login_data)) {
    //     return new Response("JSON body is not matching the requirements", { status: 422 });
    // }
    // Find user
    const superuser = await prisma.superuser.findUnique({
        where: {
          email: login_data.email,
        },
        include: {
            organisations: true
        }
    })
    if (!superuser) {
		return new Response(JSON.stringify({message:"Invalid credientials"}), { status: 401 });
	}
    // Verify password
    const passwordIsValid = await bcrypt.compare(login_data.password, superuser.password);
    if (!passwordIsValid) {
		return new Response(JSON.stringify({message:"Invalid credientials"}), { status: 401 });
	}
    // Create token
	const jwtUser = {
		id: superuser.id,
		email: superuser.email
	};
	const token = jwt.sign(jwtUser, env.AUTH_SECRET, {
		expiresIn: '1d'
	});

    // Create cookie
    const authCookie = cookie.serialize("AuthorizationToken", `Bearer ${token}`, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
      });

    const headers = {
        "Set-Cookie": authCookie,
        location: "/"
    }

    // Create return object
    const info = {
        token: token,
        user: {
            id: superuser.id,
            email: superuser.email,
            organisations: superuser.organisations
        }
    }

	return new Response(JSON.stringify(info), {'headers' : headers});
}


