import DataReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from 'next-auth';
import getUserProfile from "@/libs/getUserProfile";


export default async function Booking(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt);

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Venue Booking</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody></table>
            <DataReserve/>
            <TextField name="Name-Lastname" label="Name-Lastname" variant="standard"></TextField>
            <TextField name="Contact-Number" label="Contact-Number" variant="standard"></TextField>
            <button name="Book Venue" className="block rounded-md bg-green-300 hover:bg-amber-500 px-3 py-3 shadow-small">Book Venue</button>
        </main>
    );
}