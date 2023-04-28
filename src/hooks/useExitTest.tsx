

export const  useExitTest = (answers:string[]) => {
    localStorage.setItem('answers', JSON.stringify(answers));
}