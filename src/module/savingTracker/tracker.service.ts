import { 
    saveProfileToFirestore, 
    getProfileFromFirestore, 
    updateProfileInFirestore,
    getAllSavings,
    getAllNames,
    addSavings,
    updateSavings,
    deleteSavings
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
};

export const updateProfileUser = async (body: { uid: string, name: string, age: number, retireAge: number, retirePeriod: number, monthlyExpenses: number }) => {
    const { uid, name, age, retireAge, retirePeriod, monthlyExpenses } = body;
    try {
        const updatedProfile = await updateProfileInFirestore(uid, name, age, retireAge, retirePeriod, monthlyExpenses);
        return { status: 200, data: { message: 'Profile updated', profile: updatedProfile } };
    } catch (error: any) {
        throw new Error('Error updating profile: ' + error.message);
    }
};

export const getAllSavingsUser = async (body: { uid: string }) => {
    const { uid } = body;
    try {
        const savings = await getAllSavings(uid);
        return { status: 200, data: { savings } };
    }
    catch (error: any) {
        throw new Error('Error getting savings: ' + error.message);
    }
};

export const getAllNamesUser = async (body: { uid: string }) => {
    const { uid } = body;
    try {
        const names = await getAllNames(uid);
        return { status: 200, data: { names } };
    }
    catch (error: any) {
        throw new Error('Error getting names: ' + error.message);
    }
};

export const addSavingsUser = async (body: { uid: string, name: string, amount: number, type: string }) => {
    const { uid, name, amount, type } = body;
    try {
        await addSavings(uid, name, amount, type);
        return { status: 201, data: { message: 'Savings added' } };
    }
    catch (error: any) {
        throw new Error('Error adding savings: ' + error.message);
    }
};

export const updateSavingsUser = async (body: { uid: string, name: string, amount: number, type: string }) => {
    const { uid, name, amount, type } = body;
    try {
        await updateSavings(uid, name, amount, type);
        return { status: 200, data: { message: 'Savings updated' } };
    }
    catch (error: any) {
        throw new Error('Error updating savings: ' + error.message);
    }
};

export const deleteSavingsUser = async (body: { uid: string, name: string }) => {
    const { uid, name } = body;
    try {
        await deleteSavings(uid, name);
        return { status: 200, data: { message: 'Savings deleted' } };
    }
    catch (error: any) {
        throw new Error('Error deleting savings: ' + error.message);
    }
};