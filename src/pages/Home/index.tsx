import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/Auth';
import { Button } from '../../components/atoms/Button';
import { Background } from '../../components/atoms/Background';
import { NavMenu } from '../../components/molecules/NavMenu';
import { NavMenuItem } from '../../components/molecules/NavMenu/components/NavMenuItem';
import { Logo } from '../../components/molecules/Logo';
import { VideoListingCard } from '../../components/molecules/VideoListing/components/Card';
import { VideoListing } from '../../components/molecules/VideoListing';
import { BackgroundGradient } from '../../components/atoms/BackgroundGradient';
import { useAPI } from '../../contexts/Api';

export const Home = () => {
  const { user, logout } = useAuth();
  const api = useAPI();

  const listingMock = Array.from({ length: 10 }, (_, i) => i).map((item) => {
    return {
      id: item,
      title: 'Continue assistindo' + item,
      children: Array.from({ length: 10 }, (_, i) => i).map((item) => {
        return {
          id: item,
          title: "Howl's Moving Castle",
          src: 'https://i.imgur.com/klJKSV0.jpg',
        };
      }),
    };
  });

  useEffect(() => {
    api
      .post('/user', {
        name: 'Teste',
        email: 'teste@testes.com',
        password: '123456',
      })
      .then((res) => console.log(res));
  }, []);

  return (
    <>
      <Background src="/background.jpg" />
      <div className="absolute top-0 left-0 w-screen h-screen overflow-x-hidden overflow-y-scroll">
        <BackgroundGradient />
        <NavMenu className="z-10 flex sticky top-0 flex-row p-4 bg-slate-600">
          <NavMenuItem to={'/movies'}>Movies</NavMenuItem>
          <NavMenuItem to={'/shows'}>TV Shows</NavMenuItem>
          <NavMenuItem to={'/popular'}>Popular</NavMenuItem>
          <NavMenuItem to={'/recently-added'}>Recently added</NavMenuItem>
          <NavMenuItem to={'/my-list'}>My list</NavMenuItem>
        </NavMenu>
        <div>
          <div className="pl-20 pt-32 my-40">
            <h1 className="text-6xl mb-2">Howl's Moving Castle</h1>

            <Button className="mr-2">Assistir</Button>
            <Button className="mr-2">Mais informações</Button>
            <Button>+</Button>
          </div>
          <div className="flex flex-col gap-4">
            {listingMock.map((item) => {
              return (
                <VideoListing key={item.id} title={item.title}>
                  {item.children.map((item, id) => {
                    return <VideoListingCard key={item.id} src={String(id)} />;
                  })}
                </VideoListing>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
