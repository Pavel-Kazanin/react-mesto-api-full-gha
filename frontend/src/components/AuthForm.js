function AuthForm(props) {

  return (
    <form className="form form-auth" onSubmit={props.handleSubmit} name="authorization" noValidate>
      <h2 className="form-auth__title">{props.title}</h2>
      {props.children}
      <input className="form-auth__submit-button" type="submit" value={props.buttonText} />
    </form>
  )
}

export default AuthForm;