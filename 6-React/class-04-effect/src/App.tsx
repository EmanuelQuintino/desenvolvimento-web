import { useState, useEffect, ChangeEvent } from "react";

type UserData = {
  name: string;
  avatar_url: string;
  bio: string;
};

type UserRepos = {
  id: number;
  name: string;
};

export function App() {
  const [userName] = useState("EmanuelQuintino");
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [userRepos, setUserRepos] = useState<UserRepos[]>([]);
  const [inputRepo, setInputRepo] = useState("");

  const filterRepos =
    inputRepo.length > 0
      ? userRepos.filter((repo) =>
          repo.name.toLowerCase().includes(inputRepo.toLowerCase())
        )
      : [];

  function handleChangeInputRepo(event: ChangeEvent<HTMLInputElement>) {
    setInputRepo(event.target.value);
  }

  useEffect(() => {
    if (userName) {
      fetch(`https://api.github.com/users/${userName}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));
    }
  }, [userName]);

  useEffect(() => {
    if (userName) {
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((response) => response.json())
        .then((data) => setUserRepos(data))
        .catch((error) => console.error(error));
    }
  }, [userName]);

  return (
    <div style={{ textAlign: "center" }}>
      <section>
        <h1>Class Effect</h1>

        {userData && (
          <section>
            <h2>{userData.name}</h2>
            <img src={userData.avatar_url} width={240} />
            <p>{userData.bio}</p>
          </section>
        )}
      </section>

      <section style={{ textAlign: "left", marginTop: 32 }}>
        <strong>Repositório: {inputRepo}</strong>

        <form style={{ marginTop: 16 }}>
          <input
            type="text"
            placeholder="Nome do repositório"
            onChange={handleChangeInputRepo}
          />
        </form>

        <ul>
          {inputRepo.length > 0
            ? filterRepos.map((repo) => {
                return <li key={repo.id}>{repo.name}</li>;
              })
            : userRepos.map((repo) => {
                return <li key={repo.id}>{repo.name}</li>;
              })}
        </ul>
      </section>
    </div>
  );
}
