import './requestPage.css';

export interface RequestPageProps {
  text: string;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitOutput: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const RequestPage = (props: RequestPageProps): JSX.Element => {
  const { text, onChangeText, onSubmitOutput } = props;

  return (
    <div className="global-container">
      <form className="request-page-container" onSubmit={onSubmitOutput}>
        <div className="header"> Weather-app</div>
        <input value={text} onChange={onChangeText} className="place-request" type="text" placeholder="City, Country" />
      </form>
    </div>
  );
};
