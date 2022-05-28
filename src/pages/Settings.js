import styles from "../styles/settings.module.css"
import { toast } from 'react-toastify';
import {useAuth} from "../hooks"
import { useState } from "react";

const Settings = () => {
    const auth = useAuth();
    const [name, setName] = useState(auth.user?.email ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const clearForm = () => {
        setPassword('');
        setConfirmPassword('');
    }

    const updateProfile = async () => {
        setSavingForm(true);

        let error = false;
        if(!name || !password || !confirmPassword){
            toast.error('Please fill all the fields');

            error = true;
            setSavingForm(false);
            return
        }

        if(password !== confirmPassword){
            toast.error('password and confirm passwort do not matched.');

            error = true;
            setSavingForm(false);
            return
        }

        if(error){
            setSavingForm(false);
        }

        const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);
        console.log('setting response', response)
        if(response.success){
            setIsEditing(false);
            setSavingForm(false);
            clearForm();
        console.log('@')

            toast.success('User updated successfully');
            console.log('@123@')
        } else{
            toast.error(response.message)
        }
        console.log('123')
        setSavingForm(false);
    };

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img 
                    src="https://cdn-icons.flaticon.com/png/128/2202/premium/2202112.png?token=exp=1653646656~hmac=9404007ff3cefa005033475b2ff39efe"
                    alt=""
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                { isEditing ? <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required/> : <div className={styles.fieldValue}>{auth.user?.name}</div>}
            </div>

            { isEditing && (
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input type="password" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Confirm Password</div>
                        <input type="password" 
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            required
                            />
                            
                    </div>
                </>
            )}

            <div className={styles.btnGrp}>
                { isEditing ? (
                    <>
                        <button className={` button ${styles.saveBtn}`} onClick={updateProfile} disabled={savingForm}> {savingForm ? 'Saving Profile...' : 'Save Profile'} </button>
                        <button className={` button ${styles.editBtn}`} onClick={()=>setIsEditing(false)}>Go Back</button>
                    </>
                    ) : (
                    <button className={` button ${styles.editBtn}`}  onClick={()=>setIsEditing(true)}>Edit Profile</button>
                )}            
            </div>
            
            

            
        </div>
    );
}

export default Settings;