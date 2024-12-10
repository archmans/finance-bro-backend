import { 
    saveProfileToFirestore, 
    getProfileFromFirestore, 
    updateProfileInFirestore 
} from "./tracker.repository";

export const createProfileUser = async (body: { uid: string, name: string, age: number, retireAge: number, retirePeriod: number, monthlyExpenses: number }) => {
    const { uid, name, age, retireAge, retirePeriod, monthlyExpenses } = body;
    try {
        const newProfile = await saveProfileToFirestore(uid, name, age, retireAge, retirePeriod, monthlyExpenses);
        return { status: 201, data: { message: 'Profile created', profile: newProfile } };
    } catch (error: any) {
        throw new Error('Error creating profile: ' + error.message);
    }
};

export const getProfileUser = async (body: { uid: string }) => {
    const { uid } = body;
    try {
        const profile = await getProfileFromFirestore(uid);
        return { status: 200, data: { profile } };
    } catch (error: any) {
        throw new Error('Error getting profile: ' + error.message);
    }
}

export const updateProfileUser = async (body: { uid: string, name: string, age: number, retireAge: number, retirePeriod: number, monthlyExpenses: number }) => {
    const { uid, name, age, retireAge, retirePeriod, monthlyExpenses } = body;
    try {
        const updatedProfile = await updateProfileInFirestore(uid, name, age, retireAge, retirePeriod, monthlyExpenses);
        return { status: 200, data: { message: 'Profile updated', profile: updatedProfile } };
    } catch (error: any) {
        throw new Error('Error updating profile: ' + error.message);
    }
};