import LoginBtn from "@/components/login-btn";
import { Button } from "@/components/ui/button";
import getAuth from "@/controllers/user-controller";
import Link from "next/link";

export default async function Home() {
    const auth = await getAuth()
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-4xl font-semibold mb-10">Welcome to Tic Tac To</h2>
                {auth.loggedIn &&
                    <div className="flex gap-4">
                        <Link href={"/games/new"}>
                            <Button>Create a new game</Button>
                        </Link>
                        <Link href={"/games"}>
                            <Button>Go to games</Button>
                        </Link>
                    </div>
                }
                <LoginBtn />
            </div>
        </main>
    );
}
