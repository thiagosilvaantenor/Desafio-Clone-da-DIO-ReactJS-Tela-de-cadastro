import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';


import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, FinalText, Row, Wrapper, BellowSignUpBtn } from './styles';


const SignUp = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
          await api.users.post(`name=${formData.nome}&email=${formData.email}&senha=${formData.senha}`);
           navigate('/login')
           return
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="nome" control={control} />
                    {errors.nome && <span>Nome completo é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Password" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <BellowSignUpBtn>Ao clicar em "criar minha conta grátis",
                      declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</BellowSignUpBtn>
                </Row>
                <Row>
                <FinalText>Já tenho conta.<a href={'/login'}> Fazer login</a> </FinalText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { SignUp }