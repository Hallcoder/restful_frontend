import ProtectedRoute from "@/components/protectedRoute";

function Home() {
    return ( 
        <ProtectedRoute>
        <div>
            This is the default home page
        </div>
        </ProtectedRoute>
     );
}

export default Home;