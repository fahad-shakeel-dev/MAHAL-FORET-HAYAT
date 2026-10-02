export function MaterialIllustration({ kind }: { kind: string }) {
  return <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
    <ellipse cx="200" cy="204" rx="135" ry="12" fill="#000" opacity=".08" />
    {kind === 'cement' ? <>
      <path d="M112 65h82l10 133H100Z" fill="#bbb6ab" /><path d="M122 55h62l10 10h-82Z" fill="#e3dfd5" />
      <path d="M197 44h87l14 158h-115Z" fill="#e9e5dc" /><path d="M210 30h60l14 14h-87Z" fill="#cbc5b9" />
      <path d="M200 104h91v44h-95Z" fill="#98712e" /><path d="M211 72h57m-60 10h63m-59 83h59m-55 10h51" stroke="#aaa295" strokeWidth="3" />
    </> : kind === 'sand' ? <>
      <path d="M67 200c35-28 52-48 76-56 23-8 32-51 56-61 23-10 42 37 57 43 36 14 56 45 81 74Z" fill="#c6a06b" />
      <path d="M67 200c35-28 52-48 76-56 23-8 32-51 56-61l-15 80-30 37Z" fill="#e0c49b" />
      {[92, 128, 169, 210, 244, 287, 319].map((x, i) => <circle key={x} cx={x} cy={185 - (i % 3) * 9} r="2" fill="#967247" />)}
    </> : <>
      {[[93,177],[136,145],[177,115],[220,145],[258,170],[304,182],[178,177],[224,192],[130,195]].map(([x,y], i) => <path key={i} d={`M${x-25} ${y+15}l8-28 26-9 19 25-12 20Z`} fill={['#9ca5aa','#69767e','#bcc2c5'][i%3]} stroke="#f3f2ef" strokeWidth="2" />)}
    </>}
  </svg>;
}
