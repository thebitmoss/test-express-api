FROM node:18

# zshとoh-my-zshを入れる
RUN apt update && apt install -y zsh git curl fonts-powerline && \
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# default shell を zsh に
RUN chsh -s $(which zsh)

# カスタムzshrc入れる
COPY zshrc.template /zshrc.template
