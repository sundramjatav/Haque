export const GenerationStatus = ( {partners , inside=false} ) => {
  const totalDirects = partners;
  const maxUnlockedLevel = totalDirects * 5;

  const isUnlocked = maxUnlockedLevel > 0;

  return (
    <>
    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
      isUnlocked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isUnlocked ? `🔓 Unlocked up to Level ${maxUnlockedLevel}` : '🔒 Level Locked'}
    </div>
    {inside && (<div className="">
                <img src={isUnlocked ? "https://img.icons8.com/3d-fluency/94/unlock--v1.png" : "https://img.icons8.com/3d-fluency/94/lock--v1.png"} className='h-20' alt="" />
              </div>)}  
    </>
  );
};