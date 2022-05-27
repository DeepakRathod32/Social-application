import styles from "../styles/settings.module.css"
import {useAuth} from "../hooks"
import { useState } from "react";

const Settings = () => {
    const auth = useAuth();
    const [name, setName] = useState(auth.user?.email ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const updateProfile = () => {

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
                { isEditing ? <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/> : <div className={styles.fieldValue}>{auth.user?.name}</div>}
            </div>

            { isEditing && (
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input type="password" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Confirm Password</div>
                        <input type="password" 
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                </>
            )}

            <div className={styles.btnGrp}>
                { isEditing ? (
                    <>
                        <button className={` button ${styles.saveBtn}`} onClick={updateProfile}> {savingForm ? 'Saving Profile...' : 'Save Profile'} </button>
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