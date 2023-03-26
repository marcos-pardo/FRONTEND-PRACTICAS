import HouseComponent from '@/componentes/casa-componentes';
import MagoComponent from '@/componentes/mago-componentes';

export default function Home() {
  return (
    <div className="fondo">
      <div className="Head">
        <img src="https://cdn.pixabay.com/photo/2020/04/22/22/01/harry-5080256_1280.png" width="175" height="175" />

        <div className="tituloHome">Hogwarts</div>
        <img src="https://cdn.pixabay.com/photo/2018/06/15/11/16/hogwarts-3476786_1280.png" alt="Ravenclaw" width="175" height="175" />
      </div>

      <HouseComponent />
    </div>
  );
}
